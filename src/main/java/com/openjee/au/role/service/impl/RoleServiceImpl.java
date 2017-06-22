package com.openjee.au.role.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Service;

import com.openjee.au.role.dao.RoleDao;
import com.openjee.au.role.model.Role;
import com.openjee.au.role.service.RoleService;

@Service("roleService") 
public class RoleServiceImpl implements RoleService {
	
	Log logger = LogFactory.getLog(RoleServiceImpl.class);
	
    @Resource(name = "roleDao")
    private RoleDao roleDao;
    
    /**
     * 获取角色列表
     */
	@Override
	public List<Role> getAll() {
		return roleDao.getAll();
	}
	
	/**
	 * 保存角色
	 */
	@Override
	public void saveRole(Role role) {
		roleDao.saveRole(role);
	}
	
	/**
	 * 更新角色
	 */
	@Override
	public void updateRole(Role role) {
		roleDao.updateRole(role);
	}
	
	/**
	 * 根据主键获取角色对象
	 */
	@Override
	public Role getRoleById(String roleId) {
		
		return roleDao.getRoleById(roleId);
	}
	
	/**
	 * 判断角色编码是否存在
	 */
	@Override
	public boolean roleCodeIsExist(String roleCode) {
		Role role = roleDao.getRoleByCode(roleCode);
		if(role != null){
			return false;
		}
		return true;
	}
	
	/**
	 * 根据主键删除角色
	 */
	@Override
	public void deleteRoleByIds(String roleIds) {
		String[] ids=roleIds.split(",");
		for(String roleId :ids){
			roleDao.deleteRoleById(roleId);
		}
	}  
}  
