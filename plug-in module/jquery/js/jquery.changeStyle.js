(function($){
				
		$.fn.extend({
			changeStyle:function(opts){
				// 在内部 先给一个默认的配置
				var defaultsSettings = {
					"backgroundColor":"blue",
					"color":"white",
					"fontSize":40
				}
				
				// for in 把传入的opts用户配置 的属性和属性值 拷贝到默认配置里面去
				for(var k in opts) {
					defaultsSettings[k] = opts[k]
				}
				
				console.log(defaultsSettings);
				console.log(opts);
				
				this.css("backgroundColor",defaultsSettings.backgroundColor);
				this.css("color",defaultsSettings.color);
				this.css("fontSize",defaultsSettings.fontSize);
			}
			
		})
		
				
})(jQuery);