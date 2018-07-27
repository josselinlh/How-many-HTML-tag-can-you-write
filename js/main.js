const urlJson = "./json/entities.json";
const buttonDom = ".js-inputAskForSearchButton";
const inputDom = ".js-inputAskForSearch";
const notifDom = ".js-notificationRow";
const cptDom = ".js-goodResultCpt";
const tagFoundDom = ".js-displayGoodResults";


let myJson = [];
let founds = [];
const cptStr = " tags founds.";

fetch(urlJson)
  .then(response => response.json())
  .then(json => displayObjFromJson(json))
  .then(x=>addEventOnSearch());




  function displayObjFromJson(json)
  {
    myJson = json;
  };

  function addEventOnSearch()
  {

    let but = document.querySelector(buttonDom);
    let input = document.querySelector(inputDom);

    but.addEventListener("click", ev => {
        let val = input.value;
        testValueFromInput(val);
      }
    );

    input.addEventListener('keypress', ev =>
    {
        if(ev.keyCode === 13)
        {
          testValueFromInput(input.value);
        }
    });
  };

  function testValueFromInput(value)
  {

    if(isAnHTMLTag(value))
    {

        if(founds.indexOf(value) > -1)
        {
          handleAlreadyExists(value);
        }
        else
        {
          handleSuccess(value);
        }
    }
    else
    {
      handleFailure(value);
    }

  }



  function isAnHTMLTag(str)
  {
    if(myJson.indexOf(str) > -1)
    {
      return true;
    }
    else {
      return false;
    }
  };

  function handleSuccess(str)
  {
    founds.push(str);

    let foundsDisplay = document.querySelector(tagFoundDom);
    let tag = document.createElement("p");
    tag.innerHTML = str;
    foundsDisplay.appendChild(tag);

    let cpt = document.querySelector(cptDom+" p");
    if(!cpt)
    {
      let el = document.createElement("p");
      el.innerHTML = founds.length+cptStr;
      document.querySelector(cptDom).appendChild(el);
    }
    else
    {
      cpt.innerHTML = founds.length+cptStr;
    }

    let input = document.querySelector(inputDom).value = "";
    handleNotif(str, "success");


  }

  function handleFailure(str)
  {
    handleNotif(str, "fail");
  }

  function handleAlreadyExists(str)
  {
    handleNotif(str, "exists");

  }  

  function handleNotif(str, state)
  {
    let dom = document.querySelector(notifDom);

    if(state === "success")
    {
      dom.innerHTML = "Success, "+str+" is a HTML5 tag.";
    }
    else if (state === "exists")
    {
      dom.innerHTML = str+" already founds.";
    }
    else
    {
      dom.innerHTML = "Failure, "+str+" is not a HTML5 tag.";
    }

  }

