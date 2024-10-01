var Action = (function($, window){
	
	
	var add_favourite = function(uid, callBack){
		if(uid == ''){
			throw 'Invalid input';
		}
		
		$.ajax({
			url : VPATH + 'ajax/add_fav',
			data: {user : uid},
			type: 'POST',
			dataType:  'json',
			success: function(res){
				if(typeof callBack == 'function'){
					callBack(res);
				}
			}
		});
		
	};
	
	var remove_favourite = function(uid, callBack){
		if(uid == ''){
			throw 'Invalid input';
		}
		
		$.ajax({
			url : VPATH + 'ajax/remove_fav',
			data: {user : uid},
			type: 'POST',
			dataType:  'json',
			success: function(res){
				if(typeof callBack == 'function'){
					callBack(res);
				}
			}
		});
	};
	
	var send_interest = function(uid, callBack){
		if(uid == ''){
			throw 'Invalid input';
		}
		
		$.ajax({
			url : VPATH + 'ajax/send_interest',
			data: {user : uid},
			type: 'POST',
			dataType:  'json',
			success: function(res){
				if(typeof callBack == 'function'){
					callBack(res);
				}
			}
		});
	};
	
	var remove_interest = function(uid, callBack){
		if(uid == ''){
			throw 'Invalid input';
		}
		
		$.ajax({
			url : VPATH + 'ajax/remove_interest',
			data: {user : uid},
			type: 'POST',
			dataType:  'json',
			success: function(res){
				if(typeof callBack == 'function'){
					callBack(res);
				}
			}
		});
	};
	
	var block = function(uid, callBack){
		if(uid == ''){
			throw 'Invalid input';
		}
		
		$.ajax({
			url : VPATH + 'ajax/block_user',
			data: {user : uid},
			type: 'POST',
			dataType:  'json',
			success: function(res){
				if(typeof callBack == 'function'){
					callBack(res);
				}
			}
		});
	};
	
	var unblock = function(uid, callBack){
		if(uid == ''){
			throw 'Invalid input';
		}
		
		$.ajax({
			url : VPATH + 'ajax/unblock_user',
			data: {user : uid},
			type: 'POST',
			dataType:  'json',
			success: function(res){
				if(typeof callBack == 'function'){
					callBack(res);
				}
			}
		});
	};
	
	var get_user_update = function(uid, type, callBack){
		
		var upd_key = {
			'M' : 'message',
			'A' : 'activity',
			'N' : 'notification',
			'I' : 'interest',
		};
		
		
		if(uid == ''){
			throw 'Invalid input';
		}
		if(type == undefined){
			type = '';
		}
		
		$.ajax({
			url : VPATH + 'ajax/get_user_update',
			data: {user_id : uid},
			dataType:  'json',
			success: function(res){
				if(res.result != '0'){
					if(typeof callBack == 'function'){
						ret_data = res.result;
						if(type != ''){
							ret_data = res.result[upd_key[type]];
						}
						callBack(ret_data);
					}
				}else{
					if(typeof callBack == 'function'){
						callBack('0');
					}
				}
				
				
				
			}
		});
	};
	
	return{
		add_favourite : add_favourite,
		remove_favourite: remove_favourite,
		send_interest: send_interest,
		remove_interest: remove_interest,
		get_user_update: get_user_update,
		unblock: unblock,
		block: block,
	}
	
})(jQuery, window);