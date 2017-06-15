package com.openjee.au.role.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.openjee.au.role.model.Role;
import com.openjee.au.role.service.RoleService;

@Controller  
@RequestMapping("/role")  
public class RoleController {  
   @Resource  
   private RoleService roleService;  
     
   @RequestMapping("/toRoleList")  
   public String toRoleList(){  
       return "role/role_list";  
   }  
   
   @RequestMapping("/getAllRole") 
   public @ResponseBody List<Role> getAllRole(){
	   return roleService.getAll(); 
   }
   
  
}  