package com.openjee.au.role.service;

import java.util.List;

import com.openjee.au.role.model.Role;


public interface RoleService {
	
	/**
	 * 获取角色列表
	 * @return
	 */
	public List<Role> getAll();
	
	/**
	 * 保存角色
	 * @param role
	 */
	public void saveRole(Role role);
	
	/**
	 * 更新角色
	 * @param role
	 */
	public void updateRole(Role role);
	
	/**
	 * 根据角色主键获取对象
	 * @param roleId 角色主键
	 * @return 角色对象
	 */
	public Role getRoleById(String roleId);
	
	/**
	 * 判断角色编码是否存在
	 * @param roleCode 角色编码
	 * @return 布尔值
	 */
	public boolean roleCodeIsExist(String roleCode);
	
	/**
	 * 根据主键删除角色,多个主键用','隔开
	 * @param roleIds 角色主键
	 */
	public void deleteRoleByIds(String roleIds);
	
}
