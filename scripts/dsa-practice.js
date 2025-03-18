(function(window){
    function dsaStart(){
        function lengthOfLastWord(word){
           return word.split(" ")[word.split(" ").length-1].length;
        }
        
        return {
            lengthOfLastWord,
        }
    }
    
    
    var asomApps = window.apps || {
        
    };
    asomApps.dsa = dsaStart;
    window.apps = asomApps;
})(window);doc

// test 
var dsa = apps.dsa()
var wordTest = dsa.lengthOfLastWord("Hello World");
var wordTest2 = dsa.lengthOfLastWord("Hello World,    am Happy to have started doing     programming");

console.log(wordTest, wordTest2);

