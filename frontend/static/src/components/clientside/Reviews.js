import React, { Component } from 'react';



class Reviews extends Component{
  constructor(props){
    super(props);
    this.state = {
      reviews: [],
    }

  }
  componentDidMount() {//only runs once mounted to the dom.
    const reviews = [{
    id: 1,
    title: "4 Stars to get your attenion",
    body: "Bob did a fantastic job! After Best Buy had my laptop for 2 months and didn't repair. Bob had for just a few days and it's good as new!!",
    author: "Greg",
    starRating: 4,
  },{
  id: 2,
  title: "Courteous management & staff",
  body: "Required PC service.  Quick turnaround and followup.  Cleaning, updating and correcting the sleep issue that caused freezing up.  Courteous management & staff.  Provided recommendation to consider for faster response.",
  author: "Annie",
  starRating: 5,
  }];
    this.setState({reviews});
  }


render(){
  const fillStar = "★"
  const emptyStar = "☆"
  const reviews = this.state.reviews.map((review, index) => (
    <div key={review.id}>
      <h2>{review.title}</h2>
      <p>{review.body}</p>
      <span>{review.author }</span>
      <span>{fillStar.repeat(review.starRating)}{emptyStar.repeat(5-review.starRating)}</span>
      </div>
));
  return(
    <>
    <div>
    { reviews }
    </div>

    </>
  )
}

}


export default Reviews;
