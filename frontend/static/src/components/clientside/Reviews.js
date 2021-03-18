import React, { Component } from 'react';



class Reviews extends Component{
  constructor(props){
    super(props);
    this.state = {
      reviews: [],
      id: 1,
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
  const reviews = this.state.reviews.filter(review => {
    if(this.state.id === review.id){
      return review
    }
    return console.log('nope');
  }).map((review, index) => (
    <div className="review-item" key={review.id}>
      <div className="review-title">{review.title}</div>
      <p className="review-text">{review.body}</p>
      <div className="flex">
      <span className="review-author">{review.author}</span>
      <span className="review-stars">{fillStar.repeat(review.starRating)}{emptyStar.repeat(5-review.starRating)}</span>
      </div>
      <span onClick={()=> this.setState({id: 1})}>back</span>
      <span onClick={()=> this.setState({id: 2})}>forward</span>
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
