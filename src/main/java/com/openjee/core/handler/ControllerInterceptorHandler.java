package com.openjee.core.handler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

/**
 * Controller拦截器:拦截所有的后台请求,实现公共功能(1.Session超时空置；2.URL权限控制；3.业务日志记录)
 * @author Administrator
 */
public class ControllerInterceptorHandler implements HandlerInterceptor {

	@Override
	public void afterCompletion(HttpServletRequest req, HttpServletResponse res, Object obj, Exception ex) throws Exception {
		
	}

	@Override
	public void postHandle(HttpServletRequest req, HttpServletResponse res, Object obj, ModelAndView model) throws Exception {
		
	}

	@Override
	public boolean preHandle(HttpServletRequest req, HttpServletResponse res, Object obj) throws Exception {
		return true;
	}

}
