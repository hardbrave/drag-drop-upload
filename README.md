## Introduction
拖拽上传图片是我们后台管理页面经常会用到的功能，为了便于使用，我将此功能封装成了一个jQuery插件，用法简单，支持高度可定制化

## Implementation
此项目其实包含了两个jQuery插件

- dragDropUpload：定义在drag-drop-upload.js文件中，这个是最底层的插件，支持最大程度的可定制化，不要轻易修改
	- upload_file：上传文件函数
	- upload_callback：上传成功回调函数
	- dragenter_css_callback：图片进入拖拽区域CSS样式回调函数
	- dragover_css_callback：图片在拖拽区域移动时CSS样式回调函数
	- drop_css_callback：图片在拖拽区域松手后CSS样式回调函数
	- uploading_css_callback：图片在上传过程中CSS样式回调函数
	- uploaded_css_callback：图片上传成功后CSS样式回调函数
- dragDropUploadWrapper：定义在drag-drop-upload-wrapper.js文件中，这个是对dragDropUpload插件的上层封装，向外暴露更少的接口以便于使用，用户可随意修改
	- upload_callback：上传成功回调函数

在实际项目中一般使用dragDropUploadWrapper插件，而不是用更底层的dragDropUpload，用户在使用过程中可以参考dragDropUploadWrapper插件的实现，并可根据自己项目的实际需求来对其进行修改

该插件实现的技术难点主要在于jQuery deferred对象的使用，通过deferred对象的使用，能将多个异步请求“串成一个同步请求“：用户将多次异步网络调用请求结果生成一个deferred对象传递给插件，插件内部通过jQuery.when等待这个deferred对象，等到所有异步请求都执行完毕后，再进行后续操作，更多jQuery deferred对象的使用可参见[jQuery Defferd对象](http://api.jquery.com/category/deferred-object/)

## Features
- 用法简单，一行代码就能调用
- 支持高度可定制，可以上传自定义图片过程中各种CSS状态样式

## Requirements
- Bootstrap 3.3及以上版本
- jQuery 2.0及以上版本

## Getting started
HTML代码

```
<span id="upload-title-image-dnd" class="btn btn-default" style="cursor: crosshair; border: 2px dotted #0B85A1;">或将图片拖拽到此处直接上传</span>
```
JS调用

```
$('#upload-title-image-dnd').dragDropUploadWrapper({
	upload_callback: function (obj) {
		// Your Code
	}
});
```

## Demo
![image](https://github.com/hardbrave/drag-drop-upload/raw/master/snapshot/drag-drop-upload.gif)
