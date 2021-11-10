package com.swqualityboard.configuration.annotation;

import com.swqualityboard.configuration.util.WithAuthUserSecurityContextFactory;
import org.springframework.security.test.context.support.WithSecurityContext;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

/*
    UnitTest 에서 @AuthenticalPrincipal 어노테이션을 구현하기 위해 만든 커스텀 어노테이션
 */

@Retention(RetentionPolicy.RUNTIME)
@WithSecurityContext(factory = WithAuthUserSecurityContextFactory.class)
public @interface WithAuthUser {

    String email();

    String role();
}