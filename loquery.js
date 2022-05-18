function query(html, rules) {
	var resultObj = {};

	for (let key in rules) {
			let value = rules[key];
			if (value.length < 2) continue;

			let targetString = value[0];
			let propertyString = value[1];

			var targets = targetString.split(">");

			var resultList = [];

			targetHtml(html, targets, 0, resultList, 0);

			var results = [];
			for (let i in resultList) {
					var list = resultList[i];
					for (let j in list) {
							results.push(list[j]);
					}
			}

			//过滤无效
			var validList = [];
			validList = results;

			if (propertyString == "text") { //取text
					for (let i in validList) {
							validList[i].content = validList[i].content.replace(/<.*?>/g, "");
							validList[i].content = validList[i].content.replace(/&nbsp;/g, "");
					}
			} else if (propertyString.length != 0 && propertyString != "html") { //取属性值
					for (let i in validList) {
							var pattern = '\\b' + propertyString + '\\b\\s*=\\s*(\"|\').*?(\"|\')';
							var regExp = new RegExp(pattern);
							var match = regExp.exec(validList[i].beginTag.body);
							if (match&&match.length > 0) {
									var content = match[0];
									var regExp = new RegExp('\\b' + propertyString + '\\b\\s*=\\s*(\"|\')');
									content = content.replace(regExp, "");
									content = content.substring(0, content.length - 1);
							}else{
									continue;
							}
							validList[i].content = content;
					}
			} else { //默认取html

			}

			var list = []
			validList.forEach(e => {
				list.push(e.content) 
			});
			resultObj[key] = list;
			// resultObj[key] = validList;
	}
	return resultObj;
}

function targetHtml(html, targets, idx, resultList, beginIndex) {
	var htmls = [];
	var index = -1; //第n个
	var target = targets[idx];
	
	if (target.indexOf("[") != -1) {
			var arr = target.split("[");
			target = arr[0];
			index = parseInt(arr[1].substring(0, arr[1].length - 1));
	}

	target = target.replace(/\s*/g, "");
	if (target.length > 0) {
			var str0 = target.substring(0, 1);
			var targetName = target;
			if (str0 == ".") { //查找class
					targetName = targetName.substring(1);
					htmls = queryHtml(html, 0, targetName, beginIndex);
			} else if (str0 == "#") { //查找id
					targetName = targetName.substring(1);
					htmls = queryHtml(html, 1, targetName, beginIndex);
			} else { //直接查找标签
					htmls = queryHtml(html, 2, targetName, beginIndex);
			}
	}

	var nidx = parseInt(idx) + 1;
	if (nidx < targets.length) {
			if (index != -1) {
					targetHtml(htmls[index].content, targets, nidx, resultList, htmls[index].beginTag.lastIndex);
			} else {
					for (let i = 0; i < htmls.length; i++) {
							targetHtml(htmls[i].content, targets, nidx, resultList, htmls[i].beginTag.lastIndex);
					}
			}
	} else if (typeof(htmls) != "undefined" && htmls.length > 0) {
			htmls = getValids(htmls);
			if (index != -1 && index < htmls.length) {
					htmls = [htmls[index]];
			}
			resultList.push(htmls);
	}
}

function getValids(htmls) {
	//过滤无效
	var validList = [];
	for (let j in htmls) {
			var isValid = true;
			var curTag = htmls[j];
			for (let k in htmls) {
					var myTag = htmls[k];
					if (curTag.beginTag.index >= myTag.beginTag.lastIndex && curTag.endTag.lastIndex <= myTag.endTag.index) {
							isValid = false;
							break;
					}
			}
			if (isValid) validList.push(curTag);
	}
	return validList;
}

function queryHtml(html, type, targetName, beginIndex) {
	var pattern = '<[^>]*class\\s*=\\s*[\'|\"][A-Za-z0-9_-\\s]*\\b' + targetName + '\\b[A-Za-z0-9_-\\s]*[\'|\"].*?[/]?\\s*>';
	if (type == 1) { //id
			pattern = '<[^>]*id\\s*=\\s*[\'|\"][A-Za-z0-9_-\\s]*\\b' + targetName + '\\b[A-Za-z0-9_-\\s]*[\'|\"].*?[/]?\\s*>';
	} else if (type == 2) { //纯标签
			pattern = '<\\s*' + targetName + '\\b.*?>';
	}
	var regExp = new RegExp(pattern, "g");
	var list = [];
	var match;
	while (match = regExp.exec(html)) {
			var body = html.substring(match.index, regExp.lastIndex);
			list.push({
					body: body,
					index: match.index,
					lastIndex: regExp.lastIndex,
			});
	}
	
	//开始查找
	var findList = [];
	// console.log(html);
	// console.log(pattern);
	for (var i = 0; i < list.length; i++) {
			var curTag = list[i];
			// console.log("1111");
			if (curTag.body.match(/[///]\s*>/g) == null) { //标签未结束
					//取得标签名
					var tagString = curTag.body.match(/<\s*[A-Za-z0-9_-]+/g)[0];
					var tagName = tagString.replace(/[<\s*]/g, "");
					// 内容字符串
					var bodyString = "";
					bodyString = html.substring(curTag.lastIndex);

					var allTags = findAllTags(bodyString, tagName, curTag.lastIndex);
					// console.log(allTags);

					var endTag = getCurrentEndTag(curTag, allTags);
					var content = html.substring(curTag.lastIndex, endTag.index);

					curTag.index = curTag.index + beginIndex;
					curTag.lastIndex = curTag.lastIndex + beginIndex;

					if (!endTag) {
						return;
					}
					endTag.index = endTag.index + beginIndex;
					endTag.lastIndex = endTag.lastIndex + beginIndex;

					findList.push({
							beginTag: curTag,
							endTag: endTag,
							content: content
					});
					// findList.push(content);
			} else { //标签结束
					findList.push({
							beginTag: curTag,
							endTag: false,
							content: curTag.body
					});
					// findList.push(content);
			}
	}
	return findList;
}

//查找所有标签
function findAllTags(html, tagName, lastIndex) {
	var pat = '<[^\/\\S]*\\b' + tagName + '\\b.*?>';
	var regExp = new RegExp(pat, "g");

	var list = [];
	var match;
	while (match = regExp.exec(html)) {
			var body = html.substring(match.index, regExp.lastIndex);
			list.push({
					body: body,
					index: match.index + lastIndex,
					lastIndex: regExp.lastIndex + lastIndex,
					type: 0 //标签类型，0开始，1结束
			});
	}

	pat = '<\\s*\/\\s*' + tagName + '\\s*>';
	regExp = new RegExp(pat, "g");
	while (match = regExp.exec(html)) {
			var body = html.substring(match.index, regExp.lastIndex);
			list.push({
					body: body,
					index: match.index + lastIndex,
					lastIndex: regExp.lastIndex + lastIndex,
					type: 1 //标签类型，0开始，1结束
			});
	}

	//排序
	list = list.sort((a, b) => a.index - b.index);

	return list;
}

//获取当前结束标签
function getCurrentEndTag(curTag, allTags) {
	var beginCount = 0;
	var curObj = false;
	for (let index in allTags) {
			let obj = allTags[index];
			if (obj.index <= curTag.index) {
					continue;
			}

			if (obj.type == 0) {
					beginCount++;
			} else {
					if (beginCount == 0) { //找到了
							curObj = obj;
							break;
					} else {
							beginCount--;
					}
			}
	}
	return curObj;
}

module.exports = {
	find: query
}
