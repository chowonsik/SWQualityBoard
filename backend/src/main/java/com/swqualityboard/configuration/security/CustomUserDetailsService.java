package com.swqualityboard.configuration.security;

import com.swqualityboard.dao.UserRepository;
import com.swqualityboard.entity.User;
import com.swqualityboard.exception.user.UserNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@AllArgsConstructor
@Component("userDetailsService")
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmailAndStatus(email, "ACTIVATE")
                .orElseThrow(() -> new UserNotFoundException("해당하는 이메일이 존재하지 않습니다."));
        return createUser(user);
    }

    // 해당 이메일로 인가된 객체 생성
    private org.springframework.security.core.userdetails.User createUser(User user) {

        Set<GrantedAuthority> roles = new HashSet<>();
        user.getAuthorities().forEach((role) ->  {
            roles.add(new SimpleGrantedAuthority(role.getRole()));
        });
        List<GrantedAuthority> grantedAuthority = new ArrayList<>(roles);
        return new org.springframework.security.core.userdetails.User(user.getEmail(),
                user.getPassword(),
                grantedAuthority);
    }

}