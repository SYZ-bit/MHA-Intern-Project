var app = angular.module("codeReview101", ['ngSanitize']);
//create an angularJS module named , declares ngSanitize as dependency to help prevent XSS attacks

app.controller("codeReview101Ctrl", function($scope, $http, $location) {
    
    $scope.fromPortal = window.location.search.indexOf("fromPortal")!==-1;//retrieve queries string portion of url and matches them, if exists is true, else false

    $scope.getCode = function(id){
        var codeDiv = document.querySelector(`#codeDiv_${id}`); //div that contains the generated code
        var codeText = document.querySelector(`#code_${id}`); // the text area to store the generated code

        var salt = document.querySelector(`#salt_${id}`); // input field containing a salt value
        var hash = CryptoJS.SHA256(id+salt.value); // combine id and user provided salt, using SHA-256 hash using CryptoJS lib
        var base64 = CryptoJS.enc.Base64.stringify(hash); // convert hash (hexadec format) into Base64 encoding(text-based form)
        codeText.value = base64;  //sets value of codeText to generated Base64-encoded hash
        codeDiv.style.display = ""         
    }

    $scope.copyCode = function(id){//copies the text from an input field to clipboard when called
        document.getElementById(`code_${id}`).select(); //retrieves input field with id of code_id
        document.execCommand('copy');
    }


    var onDefinitionsChanged = function(newDefinitions){//check if each category have been completed and mark as pass
        //check whether category is complete, loops through category
        for(let category of newDefinitions){
            if(!category.passed){//alrdy marked as pass, skip it(no need to check it again)
                var correct = true;//initialised as true
                for(let question of category.questions){ //iterates through all questions inside category, check if all questions are correct
                    correct &= question.correct; 
                }
                if(correct){
                    category.passed = true; //all questions are correct, category= true
                }
            }
        }
        let allPassed = true; //assume all categories are true
        for(let category of newDefinitions){
            if(!category.passed){//check if any category is not passed, update allPassed to false
                allPassed = false;
                break;
            }
        }
        if(allPassed){
            $('#finalModal').modal();
        }
    }

    $http.get("definitions.json") //fetches a JSON file
    .then(function(response) { //runs when HTTP request completes
        if(response != null && response.data != null){ //check response
            //init definitions
            $scope.definitions = response.data; //stores fetched data into scope.definitions
            
            $scope.$watch(function() { return $scope.definitions; }, onDefinitionsChanged, true); //monitor changes in given value, update dynamically, function onDefinitionsChanged whenever definitions are updated
        }
    },function(errorMessage){
        console.error(errorMessage);//logs the errormessage for browser console, for debug
        $scope.errorMessage = `An HTTP error has occurred: '${errorMessage.statusText}'!`; //request fails, updates scope.errormessage       
    });


});

app.directive("markdownIt", ['$sanitize', function($sanitize){
    function linkFunc(scope, element, attrs) { //converts md to html file
        var md = window.markdownit(); //convert markdown syntax into html
        element.html($sanitize(md.render(element.text()))); //extract text, convert, sanitize and insert into html
    }

    return {
        restrict: "AE",
        link: linkFunc
    } 
}])

app.directive("highlightCode", ['$http','$anchorScroll', function($http, $anchorScroll){ //fetches and highlight code snippets dynamically

    function highlightLine(html,lineNoToHighlight){
        let lines = html.split("\n");
        let lineno = 1;
        html = "";
        for(let line of lines){
            if(lineno == lineNoToHighlight ){ //matches, highlight the line
                html+=`<span class="text-white">${line}</span>`;
            }
            else{
                html+=line;//added without modification
            }
            html+="\n";//final output retains line break between each html line
            lineno++;
        }
        return html;
    }

    function replaceTags(text){//escapes special HTML characters to prevent code injection attacks
        text=text.replace(/&/g,"&amp;"); 
        text=text.replace(/</g,"&lt;"); //replace < to &lt
        text=text.replace(/>/g,"&gt;"); //replace > to &gt
        return text;       
    }

    function linkFunc (scope, element, attrs) {

        $http.get(attrs.snippet) //fetch file from snippet
        .then(function(response) {
            if(response != null && response.data != null){ //check if it contains valid data
                //init definitions
                let text = response.data;//save content into a text variable
                text = text.replace(/^#.*$/gm, "");//remove python single-line comments
                text = text.replace(/"""[\s\S]*?"""|'''[\s\S]*?'''/g, "");//remove python multi-line comments
                text = replaceTags(text);
                
                if(scope.q && scope.q.lineToHighlight){
                    text = highlightLine(text,scope.q.lineToHighlight);
                }

                element.html(text); //update html context with process and formatted code

                for(let domEl of element){
                    hljs.highlightBlock(domEl); //syntax highlighting, make code visually readable
                }

                $anchorScroll();//automatically scrolls page to highlighted section, allow user to directed to specific code snippet on page
            }
        });
       

        //listeners follow

        element.on("click",function(event){
            let q = scope.q;//question object
            if(typeof q.correct !== "undefined") return;
            q.correct = (q.answer === scope.$index);//compare if q.ans = scope.$index
            element.selected = true;
            if(q.correct){
                element.css({
                    backgroundColor:"darkgreen"
                });
            }
            else {
                element.css({
                    backgroundColor:"darkred"
                });
            }

            scope.$apply();//ensure ui is updated
        });

        element.on("mouseover",function(event){//mouseover function
            let q = scope.q;
            if(typeof q.correct !== "undefined") return;
            element.css({
                backgroundColor:"darkslategray"
            });
            
        });

        element.on("mouseleave",function(event){
            let q = scope.q;
            if(typeof q.correct !== "undefined") return;
            element.css({
                backgroundColor:""
            });
        });
    }

    return {
        restrict: "AE",
        link: linkFunc
    } 
}])

app.filter('highlight', function() {//highlight function
    return function(text, phrase) {
        return phrase
            ? text.replace(new RegExp('('+phrase+')', 'gi'), '<span class="uppercase-transform">$1</span>')
            : text;
    };
});