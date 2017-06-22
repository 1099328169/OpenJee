package com.openjee.au.role.dao;

import java.util.List;

import com.openjee.au.role.model.Role;

public interface RoleDao {
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
	 * 根据主键删除角色
	 * @param roleId 角色主键
	 */
	public void deleteRoleById(String roleId);
	
	/**
	 * 根据主键获取角色对象
	 * @param roleId 角色主键
	 * @return 角色对象
	 */
	public Role getRoleById(String roleId);
	
	/**
	 * 根据角色编码获取角色对象
	 * @param roleCode 角色编码
	 * @return 角色对象
	 */
	public Role getRoleByCode(String roleCode);
}
