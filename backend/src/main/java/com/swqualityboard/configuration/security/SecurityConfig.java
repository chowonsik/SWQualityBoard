package com.swqualityboard.configuration.security;

import com.swqualityboard.configuration.jwt.JwtAccessDeniedHandler;
import com.swqualityboard.configuration.jwt.JwtAuthenticationEntryPoint;
import com.swqualityboard.configuration.jwt.JwtSecurityConfig;
import com.swqualityboard.configuration.jwt.TokenProvider;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.CorsFilter;

@EnableGlobalMethodSecurity(prePostEnabled = true)
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final TokenProvider tokenProvider;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
    private final CorsFilter corsFilter;

    public SecurityConfig(
            TokenProvider tokenProvider,
            JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint,
            JwtAccessDeniedHandler jwtAccessDeniedHandler,
            CorsFilter corsFilter
    ) {
        this.tokenProvider = tokenProvider;
        this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
        this.jwtAccessDeniedHandler = jwtAccessDeniedHandler;
        this.corsFilter = corsFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    public void configure(WebSecurity web) {
        web.ignoring()
                .antMatchers(
                        "/h2-console/**"
                        , "/favicon.ico"
                        , "/error"
                );
        web.ignoring().antMatchers("/api/docs/**");
        web.ignoring().requestMatchers(PathRequest.toStaticResources().atCommonLocations());
    }
    /*
     * ????????? ???????????? ??????
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.httpBasic().disable() // rest api ?????? ???????????? ?????? ????????? ?????????????????????.
                .csrf().disable() // csrf ?????? ?????? disable??????.
                .addFilterBefore(corsFilter, UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler)
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // ?????? ?????? ??????????????? ?????? ?????? ???????????? ????????????.
                .and().authorizeRequests() // ????????? ?????? ???????????? ??????
                .antMatchers("/api/users/signin").permitAll()
                .antMatchers("/api/users/signup").permitAll()
                .antMatchers("/api/authenticate").permitAll()
                .antMatchers("/docs/**").permitAll()
                .anyRequest().authenticated()
                .and()
                .apply(new JwtSecurityConfig(tokenProvider));
        // JwtAuthenticationFilter??? UsernamePasswordAuthenticationFilter ?????? ?????????
    }

}