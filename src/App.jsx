import { useEffect, useState } from "react";
import { TVShowAPI } from "./api/tv-show";
import s from "./style.module.css";
import { BACKDROP_BASE_URL } from "./config";
import { TVShowDetail } from "./components/TVShowDetail/TVShowDetail";
//import { TVShowListItem } from "./components/TVShowListItem/TVShowListItem";
import { Logo } from "./components/Logo/Logo";
import logoImg from "./assets/images/logo.png";
import { TVShowList } from "./components/TVShowList/TVShowList";
import { SearchBar } from "./components/SearchBar/SearchBar";

export function App() {
  const [currentTVShow, setCurrentTVShow] = useState();
  const [recommendationList, setRecommendationList]=useState([]);

  async function fetchPopulars() {
  try{
    const popularTVShowList = await TVShowAPI.fetchPopulars();
    if (popularTVShowList.length > 0) {
      setCurrentTVShow(popularTVShowList[0]);
    }
  }catch(error){
alert('Something went wrong fetching popular TV shows')
  }

}

  async function fetchRecommendations(tvShowId) {
    try{
    const recommendedationListResp = await TVShowAPI.fetchRecommendations(tvShowId);
    if (recommendedationListResp.length > 0) {
      setRecommendationList(recommendedationListResp.slice(0,10));
    }
  }catch(error){
    alert('Something went wrong fetching recommnded TV shows')
  }
  }


  async function fetchByTitle(title){
    try{
    const searchResponse = await TVShowAPI.fetchByTitle(
      title
    );
    if (searchResponse.length>0)  {
      setCurrentTVShow(searchResponse[0]);
    }
  }catch(error){
    alert('Something went wrong fetching your search')
  }
  }




 function updateCurrentTVShow(tvShow) { 
  //uses useEffect(currentTVShow). The div  onClickItem={updateCurrentTVShow} below makes
  //the magic happen
  setCurrentTVShow(tvShow);
  }

  useEffect(() => {
    fetchPopulars();
  }, []);



  // check to see if re-render happens. if so, then reload recommendations

  useEffect(() => {
    if (currentTVShow){
      fetchRecommendations(currentTVShow.id);
    }
  }, [currentTVShow]);




  return (
    <div
      className={s.main_container}
      style={{
        background: currentTVShow
          ? `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)),
             url("${BACKDROP_BASE_URL}${currentTVShow.backdrop_path}") no-repeat center / cover`
          : "black",
      }}
    >
      <div className={s.header}>
        <div className="row">
          <div className="col-4">
            <Logo
              title="Watowatch"
              subtitle="Find a show you may like"
              image={logoImg}
            />
          </div>
          <div className="col-md-12 col-lg-4">
            <SearchBar onSubmit={fetchByTitle}/>
        
          </div>
        </div>
      </div>
      <div className={s.tv_show_details}>
        {currentTVShow && <TVShowDetail tvShow={currentTVShow} />}
      </div>
      <div className={s.recommended_shows}>
        {currentTVShow && <TVShowList 
        onClickItem={updateCurrentTVShow}
        tvShowList={recommendationList} />}
      </div>
    </div>
  );
}
