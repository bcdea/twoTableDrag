var listData = [];// 已选录入表数据{ORDERID,TABLEID,MODELNAME}
var tableData = [];// 可选录入表数据
// var listData_lastSave = [-1];// 当前树节点保存的已选数据
// var ztreeId = "";
// var ztreePId = "";

tableData = []

$(function () {
	// 初始化 已选录入表
//	initLeftList();
	// 已选录入表拖拽排序
	sortable();
	// 初始化 可选录入表
	initRightTab();
	// 拖拽置放  -拖入已选录入表
	addListClass();
	// 删除已选录入表
	initDel();
});


// 刷新字段列表  
function initLeftList() {
	// 按ORDERID排序
	listData.sort(function (a, b) {
		if (a.ORDERID < b.ORDERID) {
			return -1;
		} else if (a.ORDERID == b.ORDERID) {
			return 0;
		} else {
			return 1;
		}
	});
	
	var factors = $("#list")[0];
	factors.innerHTML = "";// 清空ul子节点
	if (listData.length > 0) {
		for (var i = 0; i < listData.length; i++) {
			// 添加 li
			var span = document.createElement("span");
			var span_ = document.createElement("span");
			span_.setAttribute("style", "display:none;");
			span_.innerText = "yxFlag";// 已选录入表标记
			span.setAttribute("class", "li_span");
			span.innerText = i+1;
			var li = document.createElement("li");
			li.setAttribute("class", "layui-nav-item");
			li.setAttribute("ORDERID", i+1);
			li.setAttribute("TABLEID", listData[i].TABLEID);
			li.setAttribute("MODELNAME", listData[i].MODELNAME);
			li.innerText = listData[i].MODELNAME;
			li.appendChild(span_);
			li.appendChild(span);
			factors.appendChild(li);
		}
	}
	initRightTabColor();
}

// 左右拖拽后  隐藏/显示可选录入表行
function initRightTabColor(){
	for (var i = 0; i < tableData.length; i++) {
		var flag = false;
		for(var j = 0; j < listData.length; j++){
		    if(tableData[i].MODELID == listData[j].TABLEID){
		    	flag = true;
		    	break;
		    }
		}
		if(flag){
			$("tr").eq(i+1).css("display","none");
		}else{
			$("tr").eq(i+1).css("display","block");
		}
	}
}

// 已选列表排序  先修改ORDERID 然后根据ORDERID数组重新排序
function sortable() {
	$("#list").sortable();
	$("#list").disableSelection();

	// stop当排序动作结束时触发此事件。
	$('#list').bind('sortstop', function(event, ui) {
		var array = $('#list').sortable('toArray', {
		    attribute : "TABLEID"
	    });
		for (var i = 0; i < array.length; i++) {
			for (var j = 0; j < listData.length; j++) {
				if(listData[j].TABLEID == array[i]){
					listData[j].ORDERID = i+1;
				}
			}
		}
		// 拖入后 边框高亮 500ms后恢复
		borderColor("#leftList");
		initLeftList();
    });
}

// 拖拽置放  -拖入已选录入表
function addListClass() {
    $("#leftList").droppable({
        drop: function (event, ui) {
        	if(ui.helper[0].children[0].innerText != "yxFlag"){
        		for (var i = 0; i < listData.length; i++) {
					if(listData[i].TABLEID == ui.helper[0].children[0].innerText.replace(/[\r\n]/g, "")){
						alert("【"+listData[i].MODELNAME+"】已经存在");
						return;
					}
				}
				// 拖入后 边框高亮 500ms后恢复
				borderColor("#leftList");
		    	// 添加数据
        		listData.push({
        			'ORDERID' : listData.length,
        			'TABLEID' : ui.helper[0].children[0].innerText.replace(/[\r\n]/g, ""),
        			'MODELNAME' : ui.helper[0].children[1].innerText.replace(/[\r\n]/g, "")
				});
        		initLeftList();
			$('#leftList_ul').animate({
				scrollTop: leftData.length*47 + 13
			}, 'slow');
        	}
        }
    });
}

// 初始化右侧数据
function initRightTab() {
    // tableData = YCDCommon.Ajax.syncAjax("../../pref/getExpModel");
    tableData = [{
	    	"MODELID" : "001",
	    	"MODELNAME" : "野原新之助"
	    }, {
	    	"MODELID" : "002",
	    	"MODELNAME" : "风涧澈"
	    }, {
	    	"MODELID" : "003",
	    	"MODELNAME" : "樱田妮妮"
	    }, {
	    	"MODELID" : "004",
	    	"MODELNAME" : "阿呆"
	    }, {
	    	"MODELID" : "005",
	    	"MODELNAME" : "佐藤正男"
	    }, {
	    	"MODELID" : "006",
	    	"MODELNAME" : "酢乙女爱"
	    }
	    // 春日部防卫队
	    , {
	    	"MODELID" : "007",
	    	"MODELNAME" : "大原娜娜子"
	    }, {
	    	"MODELID" : "008",
	    	"MODELNAME" : "野原广志"
	    }, {
	    	"MODELID" : "009",
	    	"MODELNAME" : "小山美冴"
	    }, {
	    	"MODELID" : "010",
	    	"MODELNAME" : "野原银之介"
	    }, {
	    	"MODELID" : "011",
	    	"MODELNAME" : "小山梦冴"
	    }, {
	    	"MODELID" : "012",
	    	"MODELNAME" : "小山真冴"
	    }, {
	    	"MODELID" : "013",
	    	"MODELNAME" : "厚美"
	    }
    ];
    var dimOptions = {
        elem: '#table',
        height: 'full-80',
        data: tableData,
        limit: tableData.length,
        size: 'sm', // 小尺寸的表格
        cols: [[
            {
            	field: "MODELID",
                title: "编码",
                hide: true
            }, {
                field: "MODELNAME",
                title: "名称",
                width: '100%'
            }
        ]],
        done: function (res, curr, count) {

            addTabDrag();
        }
	};
    layui.table.render(dimOptions);
}
// 右侧表格添加拖拽功能
function addTabDrag() {
    $(".layui-table tbody tr").addClass("drag");
 // 拖动到table外也显示tr内容
    $(".layui-table-box,.layui-table-body,.layui-table-body .layui-table").css("position", "static");
    $(".drag").draggable({
        cursor: "pointer",
        scroll: false,
        helper: 'clone'
    });
}

// 右侧表格绑定拖入功能
function initDel(){
	$("#rightTable").droppable({
	    drop: function (event, ui) {
	    	if(ui.helper[0].children[0].innerText == "yxFlag"){
		        // 删除
		    	for (var i = 0; i < listData.length; i++) {
		    		if(listData[i].TABLEID == ui.helper[0].attributes.TABLEID.value){
		    			listData.splice(i, 1);
		    		}
				}
				// 拖入后 边框高亮 500ms后恢复
		    	borderColor("#rightTable");
		    	initLeftList();
	    	}
	    }
	});
}

// 拖入后 边框高亮 500ms后恢复
function borderColor(id){
	$(id).css("border-color", "rgb(20, 255, 226)");
	setTimeout(function (){
		$(id).css("border-color", "rgb(189, 213, 241)");
	}, 500)
}

// 保存
/*function save(){
	var result = YCDCommon.Ajax.syncAjax("../../pref/saveTableCompare", {
		'rowDatas' : JSON.stringify(listData),
		'stageId' : ztreeId,
		'evalType' : ztreePId,
		'finyear' : finyear
	});
	if(result.isError){
		alert("保存失败<br>"+result.errMsg);
		return;
	}else{
		alert("保存成功");
	}
	listData_lastSave = [].concat(listData);
}
*/


