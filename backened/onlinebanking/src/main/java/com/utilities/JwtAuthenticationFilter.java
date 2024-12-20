package com.utilities;


import java.io.IOException;

import javax.management.monitor.GaugeMonitor;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    private Logger logger = LoggerFactory.getLogger(OncePerRequestFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String reqToken = request.getHeader("Authorization");

        logger.info("header: {}", reqToken);

        String username = null;
        String token = null;
        
        if (reqToken != null && reqToken.startsWith("Bearer ")) {
            token = reqToken.substring(7);
            try {
                username = jwtUtil.getUsernameFromToken(token);
            } catch (IllegalArgumentException e) {
                logger.info("JWT token is missing or empty!");
            } catch (ExpiredJwtException e) {
                logger.info("JWT token has expired!");
            } catch (MalformedJwtException e) {
                logger.info("Invalid JWT token!");
            }
        } else {
            logger.info("Invalid Authorization header value: {}", reqToken);
        }

       

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            Boolean validatedToken = jwtUtil.validateToken(token, userDetails);

            if (validatedToken) {

                  UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(userDetails, null,
                        userDetails.getAuthorities());

                auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(auth);
            } else {
                logger.info("Validation failed!");
            }

        }

        filterChain.doFilter(request, response);

    }

	

}