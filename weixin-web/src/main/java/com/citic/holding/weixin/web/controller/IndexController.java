package com.citic.holding.weixin.web.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import net.sf.json.JSONObject;

@Controller
@RequestMapping(value = "wx_index")
public class IndexController {
	@RequestMapping(value = "/index", method = RequestMethod.GET)
	public String wxindex(HttpServletRequest req, HttpServletResponse resp,
			Model mode, ModelMap modelMap) throws Exception {

		JSONObject paramJson = new JSONObject();
		JSONObject paramsecJson = new JSONObject();
		JSONObject resJson = new JSONObject();
		String param = "";
		String test = req.getParameter("test")+"";
		

		 
		paramJson.put("flag", "getMyIndexPic");
		paramJson.put("params", paramsecJson);
		param += "param=" + paramJson;
		//resJson = interfaceService.getMyData(param);
		// log.info("myorder="+resJson);
		//
		if (test.equals("1")){
		resJson = JSONObject.fromObject((resJson+"").replaceAll ("\"LINK_URL\":\"http\\:\\/\\/[^/]+", "\"LINK_URL\":\""));
		}
		req.setAttribute("indexPics", resJson);
		return "/jsp/index";
	}
}
