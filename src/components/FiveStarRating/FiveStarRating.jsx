import { StarFill, StarHalf, Star as StarEmpty} from "react-bootstrap-icons";

//dummy up
const rating = 3.7

export function FiveStarRating(props){

//Declare star icon array

const starList = [];


// store number of filled stars

const starFillCount = Math.floor(rating);


// store partial star yes/no

const  hasHalfStar = rating - parseInt(rating) >= 0.5;

// Store # of empty stars

const emptyStarCount = 5 - starFillCount - (hasHalfStar ? 1 :0)



//push filled star if needed

for(let i=1; i<=starFillCount; i++){
    starList.push(<StarFill key={"star-fill" + i }/>) ;
}

//push half stars

if (hasHalfStar){
    starList.push(<StarHalf key={"star-half" }/>);
}

// push empty stars

for(let i=1; i<=emptyStarCount; i++){
    starList.push(<StarEmpty key={"star-empty" + i }/>) ;
}


//render the star array


    return <div> {starList}
       
    </div>

}