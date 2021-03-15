import JobItem from './JobItem';


function JobsList(props) {
  console.log(props);
  const job = props.jobs.map((job, id) => (
      <JobItem key={id} job={job} jobs={props.jobs}
      />
));

  return(
    <>


    <ul className="JobList"> { job }
    </ul>

    </>
  )
}

export default JobsList;
