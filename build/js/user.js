;$(function () {

	//http://www.runoob.com/jquery/jquery-plugin-validate.html
	if($('#form_reg').length){
		$("#form_reg").validate({
			rules: {
				form__id: {
					required: true,
					minlength: 2
				},
				form__pwd: {
					required: true,
					minlength: 6
				},
				form__r_pwd: {
					required: true,
					minlength: 6,
					equalTo: "#form__pwd"
				},
				form__name: {
					required: true,
					minlength: 2,
					maxlength: 4
				},
				form__s_id: {
					required: true,
					minlength:18,
					maxlength:18
				},
				form__auto:"required",
				form__code: {
					required: true
				}
			},
			messages:{
				form__id: {
					required: '用户名/手机号不能为空',
					minlength: '至少输入2位字符'
				},
				form__pwd: {
					required: '密码不能为空',
					minlength: '密码长度不能小于 6 个字母'
				},
				form__r_pwd: {
					required: '重复密码不能为空',
					minlength:'两次密码输入不一致',
					equalTo: "两次密码输入不一致"
				},
				form__name: {
					required: '名字不能为空',
					minlength: '名字不能少于2个字',
					maxlength: '名字不能多于4个字'
				},
				form__s_id: {
					required: '身份证号码不能为为空',
					minlength:'身份为18位',
					maxlength:'身份为18位'
				},
				form__code: {
					required: '验证码不能为空'
				},
				form__auto:'请接受我们的声明'
			}
			// ,success:"valid",
			,submitHandler:function() {
				alert("Submitted!")
			}
		});

		$('.form__button--reg').click(function () {
			if (!$("#form_reg").valid()) return false;
		});
	}

	if($('#form_user').length){
		$("#form_user").validate({
			rules: {
				sex: {
					required: true
				},
				form__email: {
					required: false,
					email:true
				},
				form__qq: {
					required: false,
					number:true,
					minlength: 5,
					maxlength:11
				},
				form__user: {
					required: true,
					minlength: 2,
					maxlength: 4
				},
				form__id: {
					required: true,
					minlength:18,
					maxlength:18
				}
			},
			messages:{
				sex:'请选择性别!',
				form__email: {
					email: '请输入正确邮箱,如:xxx@xxx.com'
				},
				form__qq: {
					number: 'QQ只能是由数字组成',
					minlength: '密码长度不能小于 6 个字母'
				},
				form__user: {
					required: '名字不能为空',
					minlength: '名字不能少于2个字',
					maxlength: '名字不能多于4个字'
				},
				form__id: {
					required: '身份证号码不能为为空',
					minlength:'身份为18位',
					maxlength:'身份为18位'
				}
			}
			// ,success:"valid",
			,submitHandler:function() {
				alert("Submitted!")
			}
		});

		$('[data-js="form_user_submit"]').click(function () {
			if (!$("#form_user").valid()) return false;
		});
	}


	$('[data-js="form__label-auto"]').on('click',function () {
		var check = this.getAttribute('data-state');
		// console.log(check);
		if(check === 'no'){
			this.setAttribute('data-state','auto');
			$('.form__checkbox')[0].checked = true;
		}else{
			this.setAttribute('data-state','no');
			$('.form__checkbox')[0].checked = false;
		}
		// console.log($('.form__checkbox')[0].checked);
		return false;
	});


	var LOGIN = {
		loginBtn:$('[data-js="form__button--login"]'),
		user:$('[data-js="form__id"]'),
		pwd:$('[data-js="form__pwd"]'),
		checkMsg:function (data) {
			    $.ajax({
			       type: "POST",
			       url: "",
			       data: data,
			       cache: false,
			       dataType: "jsonp",
			       beforeSend:function(){

			       }
			    }).done(function(data){

			    }).fail(function(){

			    });

		},
		init:function () {
			var me = this;
			var user,pwd;

			me.loginBtn.on('click',function () {
				user = $.trim(me.user.val());
				pwd = $.trim(me.pwd.val());
				if(!user){
					alert('请填写账号信息!')
				}else if(!pwd){
					alert('请填写密码!')
				}else{
					//ajax
					me.checkMsg({id:user,pwd:pwd})
				}
			})
		}
	};
	LOGIN.init();

	//用户中心切换
	$('[data-js="switch"]').mstab({
		"event":"click mouseenter",
		"hd":".switch__tabs",
		"hdElement": "a",
		"view": 1,
		"cont":".switch__content .user__box"
	});
});

