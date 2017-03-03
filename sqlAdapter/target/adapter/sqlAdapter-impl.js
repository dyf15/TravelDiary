/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2016. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

/************************************************************************
 * Implementation code for procedure - 'procedure1'
 *
 *
 * @return - invocationResult
 */
 
var getDiaryDetailListStatement = "select * from detail_info where diary_detail_id = ?";
function getDiaryDetailInfo(diary_detail_id) {
	return MFP.Server.invokeSQLStatement({
		preparedStatement : getDiaryDetailListStatement,
		parameters : [diary_detail_id]
	});
}

/************************************************************************
 * Implementation code for procedure - 'procedure2'
 *
 *
 * @return - invocationResult
 */
 var getUserInfoStatement = "select user_id,user_img, user_name from user_master where user_id = ?";
function getUserInfo(param) {
	return MFP.Server.invokeSQLStatement({
		preparedStatement : getUserInfoStatement,
		parameters : [param]
	});
}

/************************************************************************
 * Implementation code for procedure - 'unprotected'
 *
 *
 * @return - invocationResult
 */
function unprotected(param) {
	return {result : "Hello from unprotected resource"};
}

/**
 * get diary top info
 */
var getDiaryStatement = "select * from diary_top_info where diary_id = ?";
function getDiary(diary_id) {
	return MFP.Server.invokeSQLStatement({
		preparedStatement : getDiaryStatement,
		parameters : [diary_id]
	});
}


function getDiaryID(user_id) {
	// var getDiaryIDStatement = "select diary_id from diary_top_info where flag = 0";
	// if (user_id != null )
	// {
	// 	getDiaryIDStatement += " and user_id = ?";
	// }
	// return MFP.Server.invokeSQLStatement({
	// 	preparedStatement : getDiaryIDStatement,
	// 	parameters : [user_id]
	// });
	return MFP.Server.invokeSQLStatement((function(){
		var getDiaryIDStatement = "select diary_id from diary_top_info where flag = 0";
		var json = {
			preparedStatement : getDiaryIDStatement + " order by diary_id desc",
			parameters: []
		};

		if (user_id != null) {
			getDiaryIDStatement += " and user_id = ? order by diary_id desc";
			json.preparedStatement = getDiaryIDStatement
			json.parameters = [user_id];
		}

		return json;
	})());
}


var getDiaryDetailIDStatement = "select diary_detail_id from diary_detail where diary_id = ?";
function getDiaryDetailID(diary_id) {
	return MFP.Server.invokeSQLStatement({
		preparedStatement : getDiaryDetailIDStatement,
		parameters : [diary_id]
	});
}

/**
 * get country list
 */
var getCountryListStatement = "select * from country";
function getCountryList() {
	return MFP.Server.invokeSQLStatement({
		preparedStatement : getCountryListStatement
		//parameters : [param]
	});
}

var getTagListStatement = "select * from tag_master";
function getTagList() {
	return MFP.Server.invokeSQLStatement({
		preparedStatement : getTagListStatement
		//parameters : [param]
	});
}

var getMaxDiaryIDStatement = "select max(diary_id) as max_diary_id from diary order by diary_id desc";
function getMaxDiaryID() {
	return MFP.Server.invokeSQLStatement({
		preparedStatement : getMaxDiaryIDStatement
		//parameters : [param]
	});
}



/**
 * add diary
 */

var addNewDiaryStatement = "insert into diary (user_id,diary_id,title, comment, tag_id, photo, introduction, country_id, spot) values (?, ?, ?, ?, ?, ?, ?, ?, ?)";
function addNewDiary(user_id,diary_id,title, comment, tag_id, photo, introduction, country_id, spot) {
	
	return MFP.Server.invokeSQLStatement({
		preparedStatement : addNewDiaryStatement,
		parameters : [user_id,diary_id,title, comment, tag_id, photo, introduction, country_id, spot]
		//parameters : ['test', 'test', '1', 'test', 'test', 'test', 'sa']
	});
}




 var getUserAddDiaryListStatement = "select diary_id,title,photo,user_id,flag,count_detail from diary_top_info where flag = 0 and diary_id = ?";
function getUserAddDiaryList(diary_id) {
	return MFP.Server.invokeSQLStatement({
		preparedStatement : getUserAddDiaryListStatement,
		parameters : [diary_id]
	});
}

 var setFavStatement = "insert into favorite (user_id,diary_detail_id) values (?, ?)";
function setFav(user_id,diary_detail_id) {
	return MFP.Server.invokeSQLStatement({
		preparedStatement : setFavStatement,
		parameters : [user_id,diary_detail_id]
	});
}


 var selFavStatement = "select favorite_id from favorite WHERE user_id = ? and diary_detail_id = ?";
function selFav(user_id,diary_detail_id) {
	return MFP.Server.invokeSQLStatement({
		preparedStatement : selFavStatement,
		parameters : [user_id,diary_detail_id]
	});
}



 var delFavStatement = "DELETE FROM favorite WHERE user_id = ? and diary_detail_id = ?";
function delFav(user_id,diary_detail_id) {
	return MFP.Server.invokeSQLStatement({
		preparedStatement : delFavStatement,
		parameters : [user_id,diary_detail_id]
	});
}

 var delDiaryStatement = "update diary set flag = 1 where diary_id = ?";
function delDiary(diary_id) {
	return MFP.Server.invokeSQLStatement({
		preparedStatement : delDiaryStatement,
		parameters : [diary_id]
	});
}




 var getUserFavDetailIDStatement = "select diary_detail_id from favorite WHERE user_id = ?";
function getUserFavDetailID(user_id) {
	return MFP.Server.invokeSQLStatement({
		preparedStatement : getUserFavDetailIDStatement,
		parameters : [user_id]
	});
}




var getUserFavDetailInfoStatement = "select * from detail_info WHERE diary_detail_id = ?";
function getUserFavDetailInfo(diary_detail_id) {
	return MFP.Server.invokeSQLStatement({
		preparedStatement : getUserFavDetailInfoStatement,
		parameters : [diary_detail_id]
	});
}


var getDetailInfoFagStatement = "select di.diary_detail_id, di.tag_id, di.tag_name, di.diary_id, di.photo, di.comment, di.latitude, " 
							  + "di.longitude, di.spot, di.count_fav_num, di.count_com_num, (select case when ("
							  + "SELECT count(*) FROM diary_detail de "
							  + "left join favorite f on f.diary_detail_id = de.diary_detail_id "
							  + "where de.diary_detail_id = di.diary_detail_id and f.user_id = ?"
							  + ") > 0 then -1 ELSE 1 END) as FAV_FLG from detail_info di "
							  + "where di.diary_id = ? and diary_detail_id = ?";
function getDetailInfoFag(user_id,diary_id,diary_detail_id) {
	return MFP.Server.invokeSQLStatement({
		preparedStatement : getDetailInfoFagStatement,
		parameters : [user_id,diary_id,diary_detail_id]
	});
}


