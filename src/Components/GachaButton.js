import '../Gacha.css';

function GachaButton({setCount, bannerType, setRoll}) {

  let color = "";
  let type = "";
  let begCount = setCount;

  if(bannerType==="acquaint") {
    type = "https://genshin101.ru/wp-content/uploads/wish_assets/acquaintFate.png";
  }
  if(bannerType==="intertwined") {
    type = "https://genshin101.ru/wp-content/uploads/wish_assets/intertwinedFate.png";
  }
  if(setCount===10||setCount===8) {

    if(setCount===8){
      begCount=10;

    }
    color="#B57365";
  }else{
    
    
    color="#ADA499";
  }
  return (
    <div className="rollButton" onClick={(e)=>setRoll(begCount)}>
      <img className="gachaRollButton" src={"https://genshin101.ru/wp-content/uploads/wish_assets/gachaRollButton.svg"} alt="rollButton"></img>
      <h4 className="wishText">Помолиться x{begCount} раз</h4>
      <div  className="wishBottom">
        <img className="wishType" src={type} alt="wishType"/>
        <h4 className="wishText" style={{color: color}}>x{setCount}</h4>
      </div>
    </div>
  );
}

export default GachaButton;
