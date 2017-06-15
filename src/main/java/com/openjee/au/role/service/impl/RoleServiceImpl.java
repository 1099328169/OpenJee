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
	
    @Resource  
    private RoleDao userDao;

	@Override
	public List<Role> getAll() {
		return userDao.getAll();
	}  
}  
