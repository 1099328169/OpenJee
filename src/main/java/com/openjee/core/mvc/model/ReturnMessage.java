package com.openjee.core.mvc.model;

/**
 * 
 * @Description  返回消息类
 * @author song
 * @Date 2017/06/21
 */
public class ReturnMessage {
	
	public static final Long SUCCESS= new Long(1);       //成功
	public static final Long FAIL = new Long(0);	        //失败
	public static final Long EXCEPTION = new Long(-1);   //异常
	
	private Long code;      //是否存在异常  
	private String result;  //结果
	private String message; //消息 
	
	public Long getCode() {
		return code;
	}
	public void setCode(Long code) {
		this.code = code;
	}
	public String getResult() {
		return result;
	}
	public void setResult(String result) {
		this.result = result;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	
}
