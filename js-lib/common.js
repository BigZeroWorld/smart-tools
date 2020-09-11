
function addEvent(obj, event, fct) {
    if (obj.attachEvent) //Est-ce IE ?
        obj.attachEvent("on" + event, fct); //Ne pas oublier le "on"
    else obj.addEventListener(event, fct, true);
}

function postAjax(url, param, callback){
    $.ajax({
        url:url,
        method:"post",
        data:param,
        dataType:"json",
        success:callback,
        error:function(jqXHR, textStatus, errorThrown){
            /*弹出jqXHR对象的信息*/
            alert("postAjax return error. "+"jqXHR.responseText: "+jqXHR.responseText+", jqXHR.status: "+jqXHR.status+", jqXHR.readyState: "+jqXHR.readyState+", jqXHR.statusText: "+jqXHR.statusText);
            /*弹出其他两个参数的信息*/
            alert("textStatus: "+textStatus);
            alert("errorThrown: "+errorThrown);
        }
    });
}

function popupInfo(info) {
    $("#info").html(info);
    $('#modelInfo').modal("show");
}