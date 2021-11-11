package com.swqualityboard.configuration.util;

import com.swqualityboard.configuration.annotation.WithAuthUser;
import com.swqualityboard.entity.Authority;
import com.swqualityboard.entity.User;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithSecurityContextFactory;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

/*
    @WithAuthUser 어노테이션의 동작을 위한 SecurityContextFactory
 */

public class WithAuthUserSecurityContextFactory implements
    WithSecurityContextFactory<WithAuthUser> {

    @Override
    public SecurityContext createSecurityContext(WithAuthUser annotation) {
        String email = annotation.email();
        String role = annotation.role();

        Set<Authority> authorities = new HashSet<>();
        Authority authority = Authority.builder().role(role).build();
        authorities.add(authority);
        User authUser = User.builder()
                .email(email)
                .authorities(authorities)
                .build();

        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
            authUser, "password",
            List.of(new SimpleGrantedAuthority(role)));
        SecurityContext context = SecurityContextHolder.getContext();
        context.setAuthentication(token);
        return context;
    }
}
