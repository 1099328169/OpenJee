package com.openjee.core.listener;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

/**
 * 服务器启动监听
 * @author Administrator
 */
public class WebInitListener implements ServletContextListener {

	/** 
	 * servletContext创建时需要调用的事件
	 * 例如：加载资源
	 */
	@Override
	public void contextInitialized(ServletContextEvent sce) {
		
	}

	/** 
	 * servletContext销毁时需要调用的事件
	 */
	@Override
	public void contextDestroyed(ServletContextEvent sce) {
		
	}
	
}
