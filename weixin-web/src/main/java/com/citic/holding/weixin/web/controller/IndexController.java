package com.citic.holding.weixin.web.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import net.sf.json.JSONObject;
 

@Controller
@RequestMapping(value = "/wx_index")
public class IndexController {
	private static Logger logger = LoggerFactory.getLogger(IndexController.class);
	@RequestMapping(value = "/index", method = RequestMethod.GET)
	public String wxindex(HttpServletRequest req, HttpServletResponse resp,
			Model mode, ModelMap modelMap) throws Exception {
        logger.info("-------/wx_index/index-------begin");
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
		logger.info("-------/wx_index/index-------end");
		return "/jsp/index";
	}
	 @RequestMapping(value="/r/{id}",method=RequestMethod.GET)
	public String get(@PathVariable("id") String id){
		 logger.info("-------/wx_index/r/"+id+"-------begin");
	        
	     logger.info("-------/wx_index/r/"+id+"-------end");
	        return "/jsp/"+id;
	    }
}
