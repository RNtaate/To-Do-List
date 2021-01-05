(()=>{"use strict";var e=function(e){var t=""+e;return(t=t.toLowerCase()).slice(0,1).toUpperCase()+t.slice(1)},t=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t='<form action="#" method="POST" class="category-form"><span class="close-form-btn">&times;</span><input type="text" placeholder="Enter name of category" name="categoryName" required value="'+e+'"><input type="submit"></form>';return t},n=function(t){var n,r,a,o,i,s,l,c=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";if(n=r=a=o=i=l="",""!=c)switch(n=c.getTaskTitle(),r=c.getTaskDesc(),a=c.getTaskDate().replace(/[/]/g,"-"),l=c.getTaskCat(),c.getPriority()){case"high":o="checked";break;case"medium":i="checked";break;case"low":s="checked"}else s="checked";var u=document.createElement("div"),d=document.createElement("select");d.setAttribute("id","todoCategories");for(var y=0;y<t.length;y+=1){var m=document.createElement("option");m.setAttribute("value",t[y].getName()),l===t[y].getName()&&m.setAttribute("selected","selected"),m.textContent=e(t[y].getName()),d.appendChild(m)}u.appendChild(d);var v=u.innerHTML+"",g='<form action="#" method="POST" class="category-form task-form"><span class="close-form-btn">&times;</span><input type="text" placeholder="Enter Task title" id="task-title" required value="'+n+'"><textarea placeholder="Describe your task here" rows="5" id="task-desc" required>'+r+'</textarea><label>Task due date : </label><input type="date" placeholder="Give it a due date" id="task-date" required value="'+a+'"><label>Task Priority: </label><span><input type="radio" name="priority" id="high" value="high" '+o+'> High</span><span><input type="radio" name="priority" id="medium" value="medium" '+i+'> Medium</span><span><input type="radio" name="priority" id="low" value="low" '+s+"> Low</span><br><label>Category: </label>"+v+'<input type="submit"></form>';return g};const r=function(e,t,n,r,a){var o=e,i=t,s=n,l=r,c=a;return{getTaskTitle:function(){return o},getTaskDesc:function(){return i},getTaskCat:function(){return c},setTaskCat:function(e){c=e},getPriority:function(){return l},getTaskDate:function(){return s},setTask:function(e,t,n,r,a){o=e,i=t,s=n,l=r,c=a}}};function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var o,i=document.querySelector("body"),s=[],l=[],c=document.querySelector(".left-pane-div"),u=document.querySelector(".right-pane-div"),d=r("Dummy Task","This is a dummy task","2020/12/30","high","Uncategorised"),y=r("Reading Task","This is a dummy task","2020/12/30","low","Reading");l.push(d),l.push(y),c.innerHTML='<ul><li class="outer-list-items"><span>All</span></li><li class="outer-list-items category-list"><span>Categories<i class="fa fa-caret-down"></i></span><ul class="inner-item-list"></ul></li></ul><div class="category-btns"><button class="new-category-btn">Create New Category</button><div class="edit-delete-category-div"><button class="edit-category-btn">Edit Category</button><button class="delete-category-btn">Delete Category</button></div></div>';for(var m=function(e){var t,n;document.querySelector(".right-pane-upper-section").style.display="none",document.querySelector(".create-task-btn").style.display="none",t=e,n=(n=l.filter((function(e){return e.getTaskTitle().toLowerCase()===t.toLowerCase()})))[0],document.querySelector(".task-details-section").style.display="block",document.querySelector(".task-heading").textContent=n.getTaskTitle(),document.querySelector(".task-description").textContent=n.getTaskDesc(),document.querySelector(".task-date").textContent="Due Date: "+n.getTaskDate(),document.querySelector(".task-priority").textContent="Priority: "+n.getPriority(),document.querySelector(".task-category-name").textContent="Category Name: "+n.getTaskCat()},v=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=document.querySelector(".task-details-section");t.style.display="none";var n=document.querySelector(".right-pane-upper-section");n.style.display="block";var r=document.querySelector(".create-task-btn");r.style.display="block";var a=document.querySelector(".tasks-list");a.innerHTML="";for(var o=document.querySelector(".inner-right-section-div"),i=0;i<e.length;i+=1){var s=document.createElement("li");s.classList.add("task-list-item"),s.classList.add(e[i].getPriority()),s.setAttribute("title","Click to view task details"),s.addEventListener("click",(function(e){m(this.children[0].textContent)}));var l=document.createElement("h3");l.textContent=e[i].getTaskTitle();var c=document.createElement("span");c.textContent="Due Date: "+e[i].getTaskDate(),s.appendChild(l),s.appendChild(c),a.appendChild(s)}o.style.display="block"},g=function(){var e,t=document.querySelector(".inner-list-items-active");null===t?v(l):(e=l.filter((function(e){return e.getTaskCat().toLowerCase()===t.textContent.toLowerCase()})),v(e))},p=function(){for(var e=document.querySelectorAll(".inner-list-items"),t=0;t<e.length;t+=1)e[t].addEventListener("click",(function(e){for(var t=document.querySelectorAll(".inner-list-items"),n=0;n<t.length;n+=1)t[n].classList.remove("inner-list-items-active");e.target.classList.add("inner-list-items-active"),document.querySelector(".edit-delete-category-div").style.display="flex",document.querySelector(".no-category-selected").style.display="none",document.querySelector(".category-heading").textContent=e.target.textContent;var r=l.filter((function(t){return t.getTaskCat().toLowerCase()===e.target.textContent.toLowerCase()}));v(r)}))},f=document.querySelectorAll(".outer-list-items > span"),k=0;k<f.length;k+=1)f[k].addEventListener("click",(function(e){for(var t=document.querySelectorAll(".outer-list-items > span"),n=0;n<t.length;n+=1)t[n].classList.remove("outer-active");switch(e.target.classList.add("outer-active"),e.target.textContent){case"All":document.querySelector(".inner-item-list").classList.remove("appear");var r=document.querySelector(".selected"),a=document.querySelector(".inner-list-items-active");document.querySelector(".edit-delete-category-div").style.display="none",document.querySelector(".no-category-selected").style.display="none",document.querySelector(".category-heading").textContent=e.target.textContent,null!=r&&r.classList.remove("selected"),null!=a&&a.classList.remove("inner-list-items-active"),v(l);break;case"Categories":document.querySelector(".inner-item-list").classList.toggle("appear"),e.target.children[0].classList.toggle("selected"),p()}}));var h=document.querySelector(".new-category-btn");console.log(h.textContent);var b=document.createElement("div");b.classList.add("category-form-div"),i.appendChild(b);var S=function(e){var t=function(e){var t=e;return{getName:function(){return t},setName:function(e){t=e}}}(e);s.push(t);var n=document.createElement("li");n.classList.add("inner-list-items"),n.textContent=t.getName(),document.querySelector(".inner-item-list").appendChild(n)};S("Uncategorised"),S("Reading");var C=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;o=document.querySelector(".category-form"),document.querySelector(".close-form-btn").addEventListener("click",(function(e){document.querySelector(".category-form-div").style.visibility="hidden",document.querySelector(".category-form-div").style.opacity="0"})),o.addEventListener("submit",(function(t){var n=o.elements[0].value;if(null===e)S(n);else{for(var r=0;r<s.length;r+=1)if(s[r].getName()===e.textContent){s[r].setName(o.elements[0].value);var a=document.querySelector(".category-heading");a.textContent===e.textContent&&(a.textContent=o.elements[0].value);break}for(var i=0;i<l.length;i+=1)l[i].getTaskCat()===e.textContent&&l[i].setTaskCat(o.elements[0].value);e.textContent=o.elements[0].value}o.reset(),document.querySelector(".category-form-div").style.visibility="hidden",document.querySelector(".category-form-div").style.opacity="0",p(),t.preventDefault()}))},q=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;document.querySelector(".close-form-btn").addEventListener("click",(function(e){document.querySelector(".category-form-div").style.visibility="hidden",document.querySelector(".category-form-div").style.opacity="0"}));var t=document.querySelector(".task-form");t.addEventListener("submit",(function(n){var o,i,s,c,u;console.log(t.elements.length);for(var d=function(r){switch(t.elements[r].id){case"task-title":var a=l.filter((function(e){return e.getTaskTitle().toLowerCase()===t.elements[r].value.toLowerCase()}));if(console.log(a.length),a.length>0&&(document.querySelector(".category-form-div").style.visibility="hidden",document.querySelector(".category-form-div").style.opacity="0",n.preventDefault(),null===e))return{v:alert("Task with that title is already taken, please enter a different task title")};o=t.elements[r].value;break;case"task-desc":i=t.elements[r].value;case"task-date":s=t.elements[r].value;case"high":case"medium":case"low":t.elements[r].checked&&(c=t.elements[r].value);break;case"todoCategories":u=t.elements[r].value}},y=0;y<t.elements.length;y+=1){var g=d(y);if("object"===a(g))return g.v}if(null===e){var p=r(o,i,s,c,u);if(l.push(p),"none"===document.querySelector(".no-category-selected").style.display){var f=document.querySelector(".inner-list-items-active");if(null==f)v(l);else{var k=l.filter((function(e){return e.getTaskCat().toLowerCase()==f.textContent.toLowerCase()}));v(k)}}}else e.setTask(o,i,s,c,u),m(o);document.querySelector(".category-form-div").style.visibility="hidden",document.querySelector(".category-form-div").style.opacity="0",n.preventDefault()}))};h.addEventListener("click",(function(){var e=document.querySelector(".category-form-div");e.innerHTML=t(),C(),e.style.visibility="visible",e.style.opacity=1})),document.querySelector(".edit-category-btn").addEventListener("click",(function(){var e=document.querySelector(".inner-list-items-active"),n=document.querySelector(".category-form-div");n.innerHTML=t(e.textContent),C(e),n.style.visibility="visible",n.style.opacity=1})),u.innerHTML='<section class="right-pane-upper-section"><div class="inner-right-section-div"><h2 class="category-heading"></h2><div class="category-tasks-div"><ul class="tasks-list"></ul><p class="note-par"><b>NOTE: </b>red is for high-priority, green is for medium-priority, blue is for low-priority</p></div></div><h2 class="no-category-selected">Select a Category or click "All" on your left to view created tasks here.</h2></section><button class="create-task-btn">Create new Task</button><section class="task-details-section"><button class="back-btn">Back</button><div class="task-details-div"><h2 class="task-heading"></h2><p class="task-description"></p><span class="task-date"></span><span class="task-category-name"></span><span class="task-priority"></span></div><div class="task-details-btns-div"><button class="edit-task">Edit task</button><button class="delete-task">Delete task</button></div></section>',document.querySelector(".create-task-btn").addEventListener("click",(function(e){var t=document.querySelector(".category-form-div");t.innerHTML=n(s),q(),t.style.visibility="visible",t.style.opacity=1})),document.querySelector(".back-btn").addEventListener("click",(function(e){g()})),document.querySelector(".delete-task").addEventListener("click",(function(e){if(confirm("Are you sure you want to delete this task?")){for(var t=document.querySelector(".task-heading").textContent,n=0;n<l.length;n+=1)if(l[n].getTaskTitle()===t){l.splice(n,1);break}g()}})),document.querySelector(".edit-task").addEventListener("click",(function(e){for(var t=document.querySelector(".task-heading"),r=0;r<l.length;r+=1)if(t.textContent===l[r].getTaskTitle()){t=l[r];break}var a=document.querySelector(".category-form-div");a.innerHTML=n(s,t),q(t),a.style.visibility="visible",a.style.opacity=1}))})();