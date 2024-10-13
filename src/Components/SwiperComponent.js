import {useState} from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Navigation, Thumbs} from 'swiper';
import 'swiper/css'

export default function SwiperComponent({bannerConfig, setWishState, setSlideIndex, setBannerName}) {

	const [thumbState, setThumbState] = useState(null);
	const [animState, setAnimState] = useState(null);

	const slideHandler = slide => {
		if (!bannerConfig.length) return
		const activeIndex = slide.activeIndex
		const activeSlide = bannerConfig[activeIndex]
		setWishState(activeSlide.bannerWishType)
		setSlideIndex(activeIndex)
		setBannerName(activeSlide.alt)
		setAnimState("none")
		setTimeout(function() {
			setAnimState("bannerChange 0.5s ease-in-out 0s 1 normal")
        }, 150);

	}

	const slides = bannerConfig.map(slide => {

		const name = slide.bannerName
		const activeType = slide.bannerWishTypeAlt
		const nameSplit = slide.bannerName.split(" ")

		let nameArray = [];
		let secArray = [];
		let nameColor = "#000000";
		let rightName = [];

		for(let index = 0; index < nameSplit.length; index++) {
	
			if(index===0) {
				nameColor = slide.bannerColor;
				nameArray.push(
					<h1 className="bannerName" style={{color: nameColor}} key={"bannerName-1"}>{nameSplit[index]}</h1>
				)
			}else{
				nameColor = "#000000";
				secArray.push(nameSplit[index])
			}
		}
		nameArray.push(
			<h1 className="bannerName" style={{color: nameColor}} key={"bannerName-2"}>{secArray.join(" ")}</h1>
		)
		
		let dropName = slide.pool["5stars"][0]?slide.pool["5stars"][0].name:""
		let defBanP = "0%"
		let begBanPx = ""
		
		if(activeType==="beginner") {

			begBanPx = "57.6%"
			rightName = <h3 className="bannerDropName bTransition" style={{animation: animState, left: "57.6%", bottom: "22%",fontSize: "1.5em"}}>{slide.pool["4stars"][2].name}</h3>
		}
		if(activeType==="character") {

			begBanPx = "50%"
			rightName = <h3 className="bannerDropName bTransition" style={{animation: animState, left: "50.3%", bottom: "23%",fontSize: "1.5em"}}>{dropName}</h3>
		}
		if(activeType==="weapon") {

			rightName =
				<>
					<div className="bannerDropName bTransition" style={{position: "absolute", animation: animState, left: "50%", bottom: "14%",fontSize: ".75em",lineHeight:"1em",maxWidth: "22%"}}>
						<h3 className="bannerDropName bTransition" style={{position: "relative",marginBottom: "2%"}}>{dropName}</h3>
						<h3 className="bannerDropName bTransition" style={{position: "relative"}}>{slide.pool["5stars"][1]?slide.pool["5stars"][1].name:""}</h3>
					</div>
					<h3 className="bannerDropName bTransition" style={{animation: animState, left: "74%", bottom: "21%",fontSize: "0.7em",lineHeight:"1em"}}>{(slide.pool["4stars"][0]?slide.pool["4stars"][0].name:"")+" и.т.д."}</h3>
				</>

		}
		if(activeType==="default") {

			defBanP = "9.6%"
			rightName =
				<>
					<h3 className="bannerDropName bTransition" style={{animation: animState, left: "36.9%", bottom: "16%",fontSize: "1.5em",lineHeight:"1.5em"}}>{dropName}</h3>
					<h3 className="bannerDropName bTransition" style={{animation: animState, left: "61.1%", bottom: "38%",fontSize: "1.5em",lineHeight:"1.5em"}}>{slide.pool["5stars"][1]?slide.pool["5stars"][1].name:""}</h3>
					<h3 className="bannerDropName bTransition" style={{animation: animState, left: "46.2%", bottom: "66%",fontSize: "1.5em",lineHeight:"1.5em"}}>{slide.pool["5stars"][3]?slide.pool["5stars"][3].name:""}</h3>
					<h3 className="bannerDropName bTransition" style={{animation: animState, left: "75.4%", bottom: "15%",fontSize: "1.5em",lineHeight:".75em"}}>{(slide.pool["5stars"][14]?slide.pool["5stars"][14].name:"")+" и.т.д."}</h3>
				</>

		}
		return (
			<SwiperSlide className="banners" key={name}>
				<div className="banner">
					<div className="bannerTypeName" style={{backgroundColor: slide.bannerColor, top: defBanP}}>{slide.bannerWishTypeName}</div>
					<div className="bannerLeftSide bTransition" style={{animation: animState, top: defBanP}}>
						<div className="bannerNameBlock">
							{nameArray}
						</div>
						<div className="bannerDescription">
							<h4>Вероятность увеличена!</h4>
							<div className="banner4info" style={{backgroundColor: slide.bannerColor}}>
								<span>✦</span>
								<span>За каждые 10 совершённых Молитв вы гарантированно получите предмет 4★ или выше.</span>
							</div>
							<div>
								Эксклюзивный персонаж 5★ доступен лишь в период данной Молитвы.
							</div>
						</div>
					</div>
					{rightName}
					<h4 className="bannerDropPhrase bTransition" style={{animation: animState, left: begBanPx, top: "84%"}}>{slide.phrase}</h4>
					<img src={"https://genshin101.ru/wp-content/uploads/wish_assets/Banners/"+slide.alt+".webp"} alt={name} style={{width: "100%", height: "100%"}}></img>
				</div>
			</SwiperSlide>
		)
	})

    const slideThumbs = bannerConfig.map(slide => {
		const name = slide.bannerName
		const activeType = slide.bannerWishTypeAlt

		let thumbArray = [];

		if(activeType==="character"||activeType==="default"||activeType==="beginner") {
			thumbArray.push(<img className="bannerThumbImage" src={"https://genshin101.ru/wp-content/uploads/wish_assets/Banners/"+slide.alt+"-thumb.webp"} key={name} alt={name} style={{position: "absolute"}}></img>)
		}
		if(activeType==="weapon") {
			thumbArray.push(<div className="bannerThumbImage" key={name}>
				<img className="bannerThumbWImage" key={name+1} src={"https://genshin101.ru/wp-content/uploads/wish_assets/Weapons/5stars/"+slide.pool["5stars"][0].alt+".webp"} alt={name} style={{height: slide.pool["5stars"][0].type==="catalyst"?"125%":"200%",position: "absolute",left: "0px"}}></img>
				<img className="bannerThumbWImage" key={name+2} src={"https://genshin101.ru/wp-content/uploads/wish_assets/Weapons/5stars/"+slide.pool["5stars"][1].alt+".webp"} alt={name} style={{height: slide.pool["5stars"][1].type==="catalyst"?"125%":"200%",position: "absolute",right: "0px"}}></img>
			</div>)
		}
		return (
			<SwiperSlide className="bannerThumb" key={name}>
				{thumbArray}
			</SwiperSlide>
		)
	})

	return (
		<>
			<Swiper
				className="bannerThumbs"
				modules={[Thumbs]}
				draggable={false}
				slideToClickedSlide={true}
				slidesPerView={bannerConfig.length}
				centeredSlides={false}
				onSwiper={setThumbState}
			>
				{slideThumbs}
			</Swiper>
			<Swiper
				className="banners"
				onSwiper={slideHandler}
				loop={false}
				onActiveIndexChange={slideHandler}
				spaceBetween={50}
				slidesPerView={1}
				modules={[Navigation, Thumbs]} navigation
				thumbs={{swiper: thumbState, multipleActiveThumbs: true}}
				pagination={{clickable: true}}
			>
				{slides}
			</Swiper>
		</>

	)
}
