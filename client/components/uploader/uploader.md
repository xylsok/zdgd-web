Uploader
========


	<uploader 
    	class="slim" 
    	workstate='?' 
    	extension='?' 
    	callback='yourfun1(o)' 
    	callerror='yourfun2(o)'>
    </uploader>
 
  

## workstate="min/[mid]/max" 
+ min 只显示一个bolck的button,无错误提示，直接选择文件并上传，上传成功后callback
+ mid 显示标准的文件选择和上传按钮，有错误提示，上传成功后callback
+ max 显示标准的文件选择和上传按钮，有错误提示，上传成功后进入编辑模式，编辑完成后callback
+ 自定义外观 min模式下，隐藏控件，通过脚本触发事件 $("#uploader_btn")

		示例代码
		<button onclick="{$('#uploader_btn').trigger('click')}">你的按钮</button>

## extension="[common]/image"
+ common 内置的默认的通用文件限制
+ image  内置的图片文件限制
+ 新的文件要求可随时添加，支持限定扩展类型和文件大小

## class="slim" 
+ 默认的控件有边框和padding:10px,slim后会删除边框和pading，min无效
