package com.openjee.au.role.controller;

import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.openjee.au.role.model.Role;
import com.openjee.au.role.service.RoleService;
import com.openjee.core.mvc.model.ReturnMessage;

@Controller  
@RequestMapping("/role")  
public class RoleController {  
   @Resource(name = "roleService")
   private RoleService roleService;  
   
   /**
    * 跳转到角色列表
    * @return
    */
   @RequestMapping("/toRoleList")  
   public String toRoleList(){  
       return "role/role_list";  
   }  
   
   /**
    * 获取所有角色
    * @return
    */
   @RequestMapping("/getAllRole") 
   public @ResponseBody List<Role> getAllRole(){
	   return roleService.getAll(); 
   }
   
   /**
    * 跳转到角色编辑
    * @return
    */
   @RequestMapping("/toRoleEdit")  
   public String toRoleEdit(){  
       return "role/role_edit";  
   }
   
   /**
    * 保存角色
    * @param roleJson
    * @return
    */
   @RequestMapping("/saveRole")
   @ResponseBody
   public ReturnMessage saveRole(String roleJson){
	   ReturnMessage returnMessage = new ReturnMessage();
	   returnMessage.setCode(ReturnMessage.SUCCESS);
	   Gson gson = new Gson();
	   Role role = gson.fromJson(roleJson, Role.class);
	   if(StringUtils.isNotBlank(role.getRoleid())){//修改
		   roleService.updateRole(role);
		   returnMessage.setMessage("更新成功！！");
	   }else{
		   roleService.saveRole(role);
		   returnMessage.setMessage("新增成功！！");
	   }
	   return returnMessage;
   }
   
   /**
    * 根据主键获取角色对象
    * @param roleId 角色主键
    * @return 角色对象
    */
   @RequestMapping("/getRoleById")
   @ResponseBody
   public Role getRoleById(String roleId){
	   Role role = roleService.getRoleById(roleId);
	   return role;
   }
   
   /**
    * 判断角色编码是否已经存在
    * @param roleCode 角色编码
    * @return 布尔值
    */
   @RequestMapping("/roleCodeIsExist")
   @ResponseBody
   public boolean roleCodeIsExist(String roleCode){
	   boolean isExist = roleService.roleCodeIsExist(roleCode);
	   return isExist;
   }
   
   /**
    * 根据角色主键删除角色，多个主键用 ','隔开
    * @param roleIds 角色主键
    * @return
    */
   @RequestMapping("/deleteRoleByIds")
   @ResponseBody
   public ReturnMessage deleteRoleByIds(String roleIds){
	   
	   roleService.deleteRoleByIds(roleIds);
	   
	   ReturnMessage returnMessage = new ReturnMessage();
	   returnMessage.setCode(ReturnMessage.SUCCESS);
	   returnMessage.setMessage("刪除成功");
	   
	   return returnMessage; 
   }
  
}  