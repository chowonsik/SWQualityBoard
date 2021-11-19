package com.swqualityboard.configuration.jwt;

import com.swqualityboard.dao.UserRepository;
import com.swqualityboard.dto.auth.TokenDto;
import com.swqualityboard.entity.User;
import com.swqualityboard.exception.user.UserNotFoundException;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

@Component
public class TokenProvider implements InitializingBean {

    private final Logger logger = LoggerFactory.getLogger(TokenProvider.class);

    private static final String AUTHORITIES_KEY = "role";

    private final String secret;
    private final long accessTokenValidityInMilliseconds;

    private Key key;

    private final UserRepository userRepository;

    public TokenProvider(
        @Value("${custom.constant.access.token.secret.key}") String secret,
        @Value("${custom.constant.access.token.validity-in-seconds}") long accessTokenValidityInSeconds,
        UserRepository userRepository) {
        this.secret = secret;
        this.accessTokenValidityInMilliseconds = accessTokenValidityInSeconds * 1000;
        this.userRepository = userRepository;
    }

    /*
     * 시크릿 키 설정
     */
    @Override
    public void afterPropertiesSet() {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    /*
     * 검증된 이메일에 대해 토큰을 생성하는 메서드
     */
    public TokenDto createToken(String email, String authorities) {

        long now = (new Date()).getTime();

        User user = userRepository.findByEmailAndStatus(email,"ACTIVATE")
            .orElseThrow(() -> new UserNotFoundException("해당하는 이메일이 존재하지 않습니다."));

        String accessToken = Jwts.builder()
            .claim("email", user.getEmail())
            .claim("nickname", user.getNickname())
            .claim("role", authorities)
            .setExpiration(new Date(now + accessTokenValidityInMilliseconds))
            .signWith(key, SignatureAlgorithm.HS512)
            .compact();

        return new TokenDto(accessToken);

    }

    /*
     * 권한 가져오는 메서드
     */
    public Authentication getAuthentication(String token) {
        Claims claims = getClaims(token);

        Collection<? extends GrantedAuthority> authorities =
            Arrays.stream(claims.get("role").toString().split(","))
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
        return new UsernamePasswordAuthenticationToken(claims.get("email"), null, authorities);
    }

    /*
     * 토큰 유효성 검사하는 메서드
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            logger.info("잘못된 JWT 서명입니다.");
        } catch (ExpiredJwtException e) {
            logger.info("만료된 JWT 토큰입니다.");
        } catch (UnsupportedJwtException e) {
            logger.info("지원되지 않는 JWT 토큰입니다.");
        } catch (IllegalArgumentException e) {
            logger.info("JWT 토큰이 잘못되었습니다.");
        }
        return false;
    }

    /*
     * 토큰에서 Claim 추츨하는 메서드
     */
    public Claims getClaims(String token) {
        try {
            return Jwts
                .parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }
}
