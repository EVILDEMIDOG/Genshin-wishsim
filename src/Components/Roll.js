import { useEffect, useState, useRef } from 'react';
import GachaButton from './GachaButton';
import SwiperComponent from './SwiperComponent';
import ReactPlayer from 'react-player';
import configBase from '../rollConfig.json';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Roll() {

    const starIcon = 'https://genshin101.ru/wp-content/uploads/wish_assets/star.svg';

    const refVideo = useRef(null);
    const starsRef = useRef(0);
    const videoRef = useRef(null);
    const objectRef = useRef([]);
    const indexRef = useRef(false);

    const [rollStart, setRollStart] = useState(0);
    const [config, setConfig] = useState(configBase);
    const [vidPlay, setVidPlay] = useState(false);
    const [displayVid, setDisplayVid] = useState("none");
    const [skipDisplay, setskipDisplay] = useState("none");
    const [fadeDisplay, setFadeDisplay] = useState("none");
    const [fadeAnimation, setfadeAnimation] = useState("none");
    const [gachaBackground, setGachaBackground] = useState("https://genshin101.ru/wp-content/uploads/wish_assets/gachaBackground.png");
    const [gachaBlock, setGachaBlock] = useState("flex");
    const [dropBlock, setDropBlock] = useState("none");
    const [dropItem, setDropItem] = useState(null);
    const [dropItemAnimation, setDropItemAnimation] = useState("none");
    const [dropType, setDropType] = useState("none");
    const [dropItemName, setDropItemName] = useState(null);
    const [dropTypeAnimation, setDropTypeAnimation] = useState("none");
    const [dropTextFadeAnim, setDropTextFadeAnim] = useState("none");
    const [starsState, setStarsState] = useState(null);
    const [dropSmallType, setDropSmallType] = useState(null);
    const [dropsHook, setDropsHook] = useState(1);
    const [dropsDisplay, setDropsDisplay] = useState(["block", "flex"]);
    const [typeDisplay, setTypeDisplay] = useState(1);
    const [dropItemScale, setDropItemScale] = useState("100%");
    const [rollVideo, setRollVideo] = useState(null);
    const [wishState, setWishState] = useState(null);
    const [slideIndex, setSlideIndex] = useState(null);
    const [bannerName, setBannerName] = useState(null);
    const [bannerCounter, setBannerCounter] = useState(0);
    const [wishButtons, setWishButtons] = useState([]);
    const [screenOverflow, setScreenOverflow] = useState('hidden');

    const [dropsFinalRolls, setDropsFinalRolls] = useState(null);
    const [dropsFinalDisplay, setDropsFinalDisplay] = useState("none");

    function stateStop() {
        setDisplayVid('none');
        setVidPlay(false);
        setGachaBlock('none')
        setGachaBackground("https://genshin101.ru/wp-content/uploads/wish_assets/rollBackground.webp");
        setRollStart(0);
        setDropBlock("flex");
        setDropItemAnimation('dropFadeIn 1.3s cubic-bezier(0, 0, 1.0, 1.0) 0s 1 normal');
        setDropTypeAnimation('dropFadeOut 1.3s cubic-bezier(0, 0, 1.0, 1.0) 0s 1 normal');
        setDropTextFadeAnim('dropTextFadeOut 2s cubic-bezier(0, 0, 1.0, 1.0) 0s 1 normal');
    }
    function fadeInOut(fadeOut) {
        setFadeDisplay('block');
        if (fadeOut) {
            setfadeAnimation('fadeOutAnimation 1s cubic-bezier(0, 0, 1.0, 1.0) 0s 1 normal');
        } else {
            setfadeAnimation('fadeInAnimation .4s cubic-bezier(0, 0, 1.0, 1.0) 0s 1 normal');
        }
        setTimeout(function () {
            setfadeAnimation('none');
        }, 1000);
    }
    function starsDraw(starCount) {
        let starsArray = [];
        for (let index = 0; index < starCount; index++) {
            let starAnimation = 'dropStarsFade ' + (2 + index / 6) + 's cubic-bezier(0, 0, 1.0, 1.0) 0s 1 normal'
            starsArray.push(<img src={starIcon} alt="star" style={{ width: 'fit-content', height: '3vh', display: dropsDisplay, animation: starAnimation }} key={index} />)
        }
        setStarsState(starsArray);
    }
    function vidEnd() {
        stateStop();
        fadeInOut(false);
    }
    function firstScreen() {
        setskipDisplay('none');
        setDropBlock("none");
        setDropsHook(1)
        setGachaBlock("flex");
        setFadeDisplay('none');
        setGachaBackground("https://genshin101.ru/wp-content/uploads/wish_assets/gachaBackground.png");
    }
    function skipButton() {

        if (rollStart !== 0) {
            refVideo.current.seekTo(0, 'seconds');
            stateStop();
            finalRollsView();
        } else {
            if (dropsHook >= objectRef.current.length) {
                firstScreen();
            } else {
                finalRollsView();
            }
        }
    }
    function drawDropItem(object) {
        setDropItemName(object.name);
        setDropItem('https://genshin101.ru/wp-content/uploads/wish_assets/' + object.links);
        setDropType(object.type);
        setDropSmallType('https://genshin101.ru/wp-content/uploads/wish_assets/' + object.smallType);
        typeIsChar(object.category);
        starsDraw(object.stars);
        setDropItemScale((object.weapType === "catalyst" ? "50%" : "100%"))
    }
    function resetCounter() {
        setBannerCounter(0)
        localStorage.removeItem(config[slideIndex].alt)
    }
    function resetAll() {
        setBannerCounter(0)
        localStorage.clear()
    }
    function rollFunction(rollPool) {
        let roll = Math.floor(Math.random() * rollPool.length);
        return (roll);
    }
    function guarantDropHandler(array, guarant) {

        let gArray = [];

        if (Math.random() >= (0.5 + (guarant ? 0.5 : 0))) {

            for (let gIndex = 0; gIndex < array.length; gIndex++) {

                if (array[gIndex].guarantee === "true") {

                    gArray.push(array[gIndex])
                }
            }
        } else {
            for (let gIndex = 0; gIndex < array.length; gIndex++) {

                if (array[gIndex].guarantee === "false") {

                    gArray.push(array[gIndex])
                }
            }
        }
        return (gArray)
    }

    function setBlock() {
        setTimeout(function () {
            setDropsDisplay(['block', 'flex']);
        }, 10);
    }
    function typeIsChar(category) {
        if (category === "character") {
            setTypeDisplay(0);
        } else {
            setTypeDisplay(1);
        }
    }
    function finalRollsView() {

        setScreenOverflow('auto')

        if (indexRef.current) {

            firstScreen();

        } else {
            if (objectRef.current.length <= 1) {
                setDropsDisplay(['block', 'flex']);
                setDropsFinalDisplay("none");
            } else {
                setfadeAnimation('finalRollsView 1s cubic-bezier(0, 0, 1.0, 1.0) 0s 1 normal');
                setDropsDisplay(["none", "none"]);

                setTimeout(function () {

                    setDropsFinalDisplay("flex");
                    setDropsHook(10);

                    let finalDrops = [];

                    function byField() {

                        return (a, b) => a.stars > b.stars ? -1 : 1;

                    }
                    objectRef.current.sort(byField());

                    for (let index = 0; index < objectRef.current.length; index++) {

                        let starsArray2 = [];
                        let filter = objectRef.current[index].category === "character" ? "none" : "brightness(2.5)";
                        let frameColor = objectRef.current[index].stars === 3 ? "#CAD6F7" : (objectRef.current[index].stars === 4 ? "#b912d6" : "gold")

                        for (let starsIndex = 0; starsIndex < objectRef.current[index].stars; starsIndex++) {
                            starsArray2.push(<img src={starIcon} alt="star" key={'star-' + index + '-' + starsIndex} />);
                        }

                        //console.log("test ", objectRef.current)
                        finalDrops.push(
                            <div className="dropFrame" key={"dropFrame-" + index} style={{ animation: "dropsFinalAnim " + ((index + 1) / 10) + "s ease-in-out 0s 1 normal" }}>
                                <svg className="filterFrame" filter={"url(#frameShadow-" + index + ")"} fill={frameColor} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 240 1000" style={{ position: "absolute", width: "100%", height: "100%" }}>
                                    <filter id={'frameShadow-' + index}><feDropShadow dx="0" dy="0" stdDeviation="5 30" floodColor={frameColor} /></filter>
                                    <path xmlns="http://www.w3.org/2000/svg" d="M14.6,847.9c0,17.5,10.3,21.6,15.4,22.6c0,26.8,17.5,13.4,30.9,24.7c7.2,10.3-1,22.5,10.3,33.3  c10.3,9.9,39.1,20.2,48.4,33.6c9.3-13.4,38.1-23.7,48.4-33.6c11.3-10.9,3.1-23,10.3-33.3c13.4-11.3,30.9,2.1,30.9-24.7  c5.1-1,15.4-5.1,15.4-22.6V152.3c0-17.5-10.3-21.6-15.4-22.6c0-26.8-17.5-13.4-30.9-24.7c-7.2-10.3,1-22.5-10.3-33.3  c-10.3-9.9-39.1-20.2-48.4-33.6c-9.3,13.4-38.1,23.7-48.4,33.6c-11.3,10.9-3.1,23-10.3,33.3C47.5,116.3,30,102.9,30,129.7  c-5.1,1-15.4,5.2-15.4,22.7V847.9z" />
                                </svg>
                                <svg className="innerFrame" xmlns="http://www.w3.org/2000/svg" fill='red' xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 240 1000">
                                    <pattern id={"pattern-" + index} width="100%" height="100%">
                                        <image className="dropFrameImage" preserveAspectRatio={(objectRef.current[index].coords ? "xMaxYMid slice" : "xMidYMid slice")} href={"https://genshin101.ru/wp-content/uploads/wish_assets/" + objectRef.current[index].links} alt={"item-" + index} style={{ width: objectRef.current[index].coords ? objectRef.current[index].coords + "%" : "100%", height: (objectRef.current[index].weapType === "catalyst" ? "auto" : "100%"), transform: (objectRef.current[index].weapType === "catalyst" ? "translate(-23%, 31%) scale(1.3)" : "none") }}></image>
                                    </pattern>
                                    <path xmlns="http://www.w3.org/2000/svg" fill={"url(#pattern-" + index + ")"} d="M14.6,847.9c0,17.5,10.3,21.6,15.4,22.6c0,26.8,17.5,13.4,30.9,24.7c7.2,10.3-1,22.5,10.3,33.3  c10.3,9.9,39.1,20.2,48.4,33.6c9.3-13.4,38.1-23.7,48.4-33.6c11.3-10.9,3.1-23,10.3-33.3c13.4-11.3,30.9,2.1,30.9-24.7  c5.1-1,15.4-5.1,15.4-22.6V152.3c0-17.5-10.3-21.6-15.4-22.6c0-26.8-17.5-13.4-30.9-24.7c-7.2-10.3,1-22.5-10.3-33.3  c-10.3-9.9-39.1-20.2-48.4-33.6c-9.3,13.4-38.1,23.7-48.4,33.6c-11.3,10.9-3.1,23-10.3,33.3C47.5,116.3,30,102.9,30,129.7  c-5.1,1-15.4,5.2-15.4,22.7V847.9z" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 240 1000" style={{ position: "absolute", width: "100%", height: "100%", fill: "none", stroke: frameColor, strokeWidth: "5" }}>
                                    <path xmlns="http://www.w3.org/2000/svg" d="M14.6,847.9c0,17.5,10.3,21.6,15.4,22.6c0,26.8,17.5,13.4,30.9,24.7c7.2,10.3-1,22.5,10.3,33.3  c10.3,9.9,39.1,20.2,48.4,33.6c9.3-13.4,38.1-23.7,48.4-33.6c11.3-10.9,3.1-23,10.3-33.3c13.4-11.3,30.9,2.1,30.9-24.7  c5.1-1,15.4-5.1,15.4-22.6V152.3c0-17.5-10.3-21.6-15.4-22.6c0-26.8-17.5-13.4-30.9-24.7c-7.2-10.3,1-22.5-10.3-33.3  c-10.3-9.9-39.1-20.2-48.4-33.6c-9.3,13.4-38.1,23.7-48.4,33.6c-11.3,10.9-3.1,23-10.3,33.3C47.5,116.3,30,102.9,30,129.7  c-5.1,1-15.4,5.2-15.4,22.7V847.9z" />
                                </svg>
                                <img className="dropFrameType" src={"https://genshin101.ru/wp-content/uploads/wish_assets/" + objectRef.current[index].smallType} alt="type" style={{ filter: filter }} />
                                <div className="dropFrameStars">
                                    {starsArray2}
                                </div>
                            </div>
                        )
                    }
                    setDropsFinalRolls(finalDrops)
                    indexRef.current = true;

                }, 500);
                setTimeout(function () { setFadeDisplay('none') }, 1000)
            }
        }
    }
    function skipRoll() {

        if (!rollStart && objectRef.current !== null) {

            setDropsHook(dropsHook + 1);

            if (dropsHook < objectRef.current.length) {
                setDropsDisplay(['none', 'none']);

                drawDropItem(objectRef.current[dropsHook])

                setBlock();

            } else {
                finalRollsView();
            }
        }
    }
    useEffect(() => {

        if (slideIndex !== null) {

            setBannerCounter(localStorage.getItem(config[slideIndex].alt))

            if (bannerName === "beginner") {

                if (localStorage.getItem("beginner") < 20) {

                    setWishButtons(
                        <div className="rollButtonBlock">
                            <GachaButton setCount={8} bannerType={wishState} setRoll={setRollStart} />
                        </div>
                    )
                } else {
                    if (config[0].alt === "beginner") {
                        setBannerCounter(0)
                        setConfig(config.slice(1, 5))
                    }
                    setWishButtons(
                        <div className="rollButtonBlock">
                            <GachaButton setCount={1} bannerType={wishState} setRoll={setRollStart} />
                            <GachaButton setCount={10} bannerType={wishState} setRoll={setRollStart} />
                        </div>
                    )
                }
            } else {
                setWishButtons(
                    <div className="rollButtonBlock">
                        <GachaButton setCount={1} bannerType={wishState} setRoll={setRollStart} />
                        <GachaButton setCount={10} bannerType={wishState} setRoll={setRollStart} />
                    </div>
                )
            }
        }

        if (rollStart !== 0) {

            indexRef.current = false;
            setDropsFinalDisplay("none");
            setDropsDisplay(['block', 'flex']);
            setScreenOverflow('hidden')

            function rollStartTimer() {

                const playSound = new Audio('https://genshin101.ru/wp-content/uploads/wish_assets/button.ogg');
                playSound.loop = false;
                playSound.play();

                setTimeout(function () {
                    setVidPlay(true);
                    setDisplayVid('block');
                    setskipDisplay('flex');
                }, 1000);
            }

            function rollDropsHandler() {

                let poolInit = 0;
                let poolStars = {};
                let dynamicRnd = [94.3, 5.1, 0.6];
                let rollTaker = [];
                let rollFinal = [];
                let trigger = 3;
                let rollIndex = localStorage.getItem(config[slideIndex].alt)

                let debugnum = 0;

                //94.3 - 5.1 - 0.6

                //cycle length

                for (let index = 1; index <= Number(rollStart); index++) {

                    rollIndex++;

                    poolInit = Math.random() * 100;

                    if ((rollIndex % 10) <= 8) {

                        dynamicRnd = [94.3, 5.1, 0.6]
                    }
                    if ((rollIndex % 10) === 9) {

                        dynamicRnd = [79.4, 20, 0.6]

                    }
                    if ((rollIndex % 10) === 0) {

                        if (rollIndex % 80 === 0) {
                            dynamicRnd = [0, 0, 100]
                        } else {
                            dynamicRnd = [0, 99.4, 0.6]
                        }
                    }

                    if (poolInit <= dynamicRnd[0]) {
                        rollTaker = poolStars = config[slideIndex].pool["3stars"]
                        starsRef.current = 3;
                    }

                    if (poolInit > dynamicRnd[0] && poolInit < (dynamicRnd[0] + dynamicRnd[1])) {
                        poolStars = config[slideIndex].pool["4stars"]
                        starsRef.current = 4;
                        rollTaker = guarantDropHandler(poolStars);
                    }

                    if (poolInit >= (dynamicRnd[0] + dynamicRnd[1])) {

                        poolStars = config[slideIndex].pool["5stars"]
                        starsRef.current = 5;
                        rollTaker = guarantDropHandler(poolStars, rollIndex % 160 === 0);
                    }
                    videoRef.current = "../" + trigger + "starsEd.mp4";
                    if (starsRef.current > trigger) {
                        trigger = starsRef.current;
                    }

                    videoRef.current = "https://genshin101.ru/wp-content/uploads/wish_assets/" + trigger + "starsEd" + ((index > 1 && trigger > 3) ? "10" : "") + ".mp4";

                    let rollObject = {}

                    let rollCurrent = rollTaker[rollFunction(rollTaker)];

                    //debug configBase ???
                    //debugnum = 4;
                    //let rollCurrent = configBase[0].pool["5stars"][debugnum];

                    rollObject.name = rollCurrent.name;
                    rollObject.alt = rollCurrent.alt;
                    rollObject.type = rollCurrent.type;
                    rollObject.category = rollCurrent.category;
                    rollObject.stars = starsRef.current;
                    rollObject.coords = rollCurrent.coords;
                    rollFinal.push(rollObject);

                }

                //console.log(debugnum)
                //console.log(configBase[debugnum])

                localStorage.setItem(config[slideIndex].alt, rollIndex)

                setBannerCounter(rollIndex)

                setRollVideo(videoRef.current);

                return (rollFinal)

            }

            fadeInOut(true);
            rollStartTimer();

            let drops = rollDropsHandler();
            objectRef.current = [];

            for (let index = 0; index < drops.length; index++) {

                objectRef.current.push({
                    name: drops[index].name,
                    category: drops[index].category,
                    links: (drops[index].category === "weapon" ? "Weapons/" + (drops[index].stars + "stars/" + drops[index].alt + ".webp") : "Characters/" + (drops[index].alt + ".png")),
                    type: (drops[index].category === "weapon" ? "https://genshin101.ru/wp-content/uploads/wish_assets/Weapons/" + (drops[index].type + ".webp") : null),
                    smallType: (drops[index].category === "weapon" ? "Weapons/mini-" + drops[index].type + ".webp" : "Characters/Elements/" + drops[index].type + ".svg"),
                    stars: drops[index].stars,
                    weapType: drops[index].type,
                    coords: drops[index].coords
                })
            }

            drawDropItem(objectRef.current[0]);

        }
    }, [rollStart, slideIndex, config])


    return (
        <>
            <div className="fadeOut" style={{ display: fadeDisplay, animation: fadeAnimation }} onClick={() => skipRoll()}></div>
            <div className="skipButton" style={{ display: skipDisplay }} onClick={() => skipButton()}>
                <h1>Пропустить</h1>
            </div>
            <ReactPlayer ref={refVideo} onEnded={() => vidEnd()} className="rollVid" autoPlay={false} playing={vidPlay} url={rollVideo} muted={false} style={{ display: displayVid, overflow: "hidden" }} width="100%" height="100%"></ReactPlayer>
            <div className="gacha" style={{ backgroundImage: `url(${gachaBackground})` }}>
                <div className="gacha mainMenu " style={{ display: gachaBlock }}>
                    <div className="gachaCenter">
                        <SwiperComponent bannerConfig={config} setWishState={setWishState} setSlideIndex={setSlideIndex} setBannerName={setBannerName} />
                    </div>
                    <div className="gachaBottom">
                        <div className="gachaRollCounter">
                            <div style={{ marginRight: "10px" }}>
                                Всего попыток: {bannerCounter ? bannerCounter : 0}
                            </div>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                                <div style={{ cursor: "pointer", color: "#B57365" }} onClick={resetCounter}>сбросить баннер</div>
                            </div>

                        </div>
                        {/* setCount - 1/10 setType - acquaint/intertwined */}
                        {wishButtons}
                    </div>
                </div>
                <div className="gacha dropMenu" style={{ display: dropBlock, overflow: screenOverflow }}>
                    <img className="dropItem" src={dropItem} alt={'weapon'} loading='lazy' style={{ height: dropItemScale, animation: dropItemAnimation, zIndex: '10', display: dropsDisplay[0] }}></img>
                    <img className="dropType" src={dropType} alt={'type'} loading='lazy' style={{ height: '100%', position: 'absolute', animation: dropTypeAnimation, display: dropsDisplay[0], opacity: typeDisplay }}></img>
                    <div className="dropAddition">
                        <img src={dropSmallType} alt="dropSmallType" style={{ display: dropsDisplay[0], height: '12vh', animation: dropTypeAnimation }} />
                        <div className="dropCorner" style={{ display: dropsDisplay[1], flexDirection: 'column', justifyContent: 'center' }} >
                            <h1 className="dropName" style={{ margin: '0', animation: dropTextFadeAnim, height: 'fit-content', fontSize: '5vh', marginBottom: '1%', fontFamily: 'math', zIndex: '10' }}>{dropItemName}</h1>
                            <div className="dropStars" style={{ display: 'flex' }}>{starsState}</div>
                        </div>
                    </div>
                    <div className="dropsFinal" style={{ display: dropsFinalDisplay }}>
                        {dropsFinalRolls}
                    </div>
                </div>
            </div>
        </>
    );
};