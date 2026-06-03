create database event_management;
use event_management;

create table Users(
user_id int primary key auto_increment,
full_name varchar(100) not null,
email varchar(100) unique not null,
city varchar(100) not null,
registration_date date not null
);

create table Events(
	event_id int primary key auto_increment,
    title varchar(200) not null,
    description text,
    city varchar(100) not null,
    start_date datetime not null,
    end_date datetime not null,
    status enum('upcoming', 'completed', 'cancelled'),
    organizer_id int,
    foreign key (organizer_id) references Users(user_id)
);

create table Sessions(
	session_id int primary key auto_increment,
    event_id int,
    title varchar(200) not null,
    speaker_name varchar(100) not null,
    start_time datetime not null,
    end_time datetime not null,
    foreign key (event_id) references Events(event_id)
);

create table Registrations(
	registration_id int primary key auto_increment,
    user_id int,
    event_id int,
    registration_date date not null,
    foreign key (user_id) references Users(user_id),
    foreign key (event_id) references Events(event_id)
);

create table Feedback(
	feedback_id int primary key Auto_increment,
    user_id int,
    event_id int,
    rating int check (rating between 1 and 5),
    comments text,
    feedback_date date not null,
    foreign key (user_id) references Users(user_id),
    foreign key (event_id) references Events(event_id)
);

create table Resources(
	resource_id int primary key Auto_increment,
    event_id int,
    resource_type Enum('pdf','image','link'),
    resource_url varchar(225) not null,
    uploaded_at datetime not null,
    foreign key (event_id) references Events(event_id)
);

INSERT INTO Users (user_id, full_name, email, city, registration_date) VALUES
(1, 'Alice Johnson', 'alice@example.com', 'New York', '2024-12-01'),
(2, 'Bob Smith', 'bob@example.com', 'Los Angeles', '2024-12-05'),
(3, 'Charlie Lee', 'charlie@example.com', 'Chicago', '2024-12-10'),
(4, 'Diana King', 'diana@example.com', 'New York', '2025-01-15'),
(5, 'Ethan Hunt', 'ethan@example.com', 'Los Angeles', '2025-02-01');

INSERT INTO Events (event_id, title, description, city, start_date, end_date, status, organizer_id) VALUES
(1, 'Tech Innovators Meetup', 'A meetup for tech enthusiasts.', 'New York', '2025-06-10 10:00:00', '2025-06-10 16:00:00', 'upcoming', 1),
(2, 'AI & ML Conference', 'Conference on AI and ML advancements.', 'Chicago', '2025-05-15 09:00:00', '2025-05-15 17:00:00', 'completed', 3),
(3, 'Frontend Development Bootcamp', 'Hands-on training on frontend tech.', 'Los Angeles', '2025-07-01 10:00:00', '2025-07-03 16:00:00', 'upcoming', 2);

INSERT INTO Sessions (session_id, event_id, title, speaker_name, start_time, end_time) VALUES
(1, 1, 'Opening Keynote', 'Dr. Tech', '2025-06-10 10:00:00', '2025-06-10 11:00:00'),
(2, 1, 'Future of Web Dev', 'Alice Johnson', '2025-06-10 11:15:00', '2025-06-10 12:30:00'),
(3, 2, 'AI in Healthcare', 'Charlie Lee', '2025-05-15 09:30:00', '2025-05-15 11:00:00'),
(4, 3, 'Intro to HTML5', 'Bob Smith', '2025-07-01 10:00:00', '2025-07-01 12:00:00');

INSERT INTO Registrations (registration_id, user_id, event_id, registration_date) VALUES
(1, 1, 1, '2025-05-01'),
(2, 2, 1, '2025-05-02'),
(3, 3, 2, '2025-04-30'),
(4, 4, 2, '2025-04-28'),
(5, 5, 3, '2025-06-15');

INSERT INTO Feedback (feedback_id, user_id, event_id, rating, comments, feedback_date) VALUES
(1, 3, 2, 4, 'Great insights!', '2025-05-16'),
(2, 4, 2, 5, 'Very informative.', '2025-05-16'),
(3, 2, 1, 3, 'Could be better.', '2025-06-11');

INSERT INTO Resources (resource_id, event_id, resource_type, resource_url, uploaded_at) VALUES
(1, 1, 'pdf', 'https://portal.com/resources/tech_meetup_agenda.pdf', '2025-05-01 10:00:00'),
(2, 2, 'image', 'https://portal.com/resources/ai_poster.jpg', '2025-04-20 09:00:00'),
(3, 3, 'link', 'https://portal.com/resources/html5_docs', '2025-06-25 15:00:00');

--1.User Upcoming Events
--Show a list of all upcoming events a user is registered for in their city, sorted by date. 
SELECT
    u.user_id,
    u.full_name,
    e.event_id,
    e.title,
    e.city,
    e.start_date
FROM Registrations r
JOIN Users u ON r.user_id=u.user_id
JOIN Events e ON e.event_id=r.event_id
WHERE e.status='upcoming' AND u.city=e.city
ORDER BY e.start_date;

--2.Top Rated Events
--Identify events with the highest average rating, considering only those that have received at least 10 feedback submissions. 
SELECT e.event_id,e.title,avg(f.rating) as avg_rating
from Events e
join Feedback f on e.event_id=f.event_id
group by e.event_id,e.title
having count(*)>=10
order by avg_rating desc;

--3. Inactive Users
--Retrieve users who have not registered for any events in the last 90 days.
select u.user_id,u.full_name,r.registration_id,r.registration_date
from Users u
left join Registrations r on u.user_id=r.user_id and r.registration_date>=curdate()-Interval 90 day;

--4. Peak Session Hours
--Count how many sessions are scheduled between 10 AM to 12 PM for each event.
select e.event_id,e.title,count(*) as session_count
from Events e
join Sessions s on s.event_id=e.event_id
where time(s.start_time) between '10:00:00' and '12:00:00'
group by e.event_id,e.title;

--5. Most Active Cities
--List the top 5 cities with the highest number of distinct user registrations.
select u.city, count(distinct u.user_id) as registered_users
from Users u
join Registrations r on u.user_id=r.user_id
group by u.city
order by registered_users DESC
limit 5;

--6.Event Resource Summary
--Generate a report showing the number of resources (PDFs, images, links) uploaded for each event.
select e.event_id,e.title,
    count(case when r.resource_type='pdf' then 1 end) as pdf_count,
    count(case when r.resource_type='image' then 1 end) as pdf_count,
    count(case when r.resource_type='link' then 1 end) as pdf_count
from Events e
left join Resources r on e.event_id=r.event_id
group by e.event_id,e.title;

--7.Low Feedback Alerts
--List all users who gave feedback with a rating less than 3, along with their comments and associated event names. 
select u.full_name,e.title as event_name,f.rating,f.comments
from Feedback f
join Users u on u.user_id=f.user_id
join Events e on f.event_id=e.event_id
where f.rating<3;

--8. Session per Upcoming Event
--Display all upcoming events with the count of sessions scheduled for them. 
select e.event_id,e.title,count(s.session_id) as session_count
from Events e
left join Sessions s on s.event_id=e.event_id
where e.status='upcoming'
group by e.event_id,e.title;

--9. Organizer Event Summary
--For each event organizer, show the number of events created and their current status (upcoming, completed, cancelled). 
select u.user_id,u.full_name,e.status,count(e.event_id) as event_count
from Users u
join Events e on u.user_id=e.organizer_id
group by u.user_id,u.full_name,e.status
order by u.user_id,e.status;

--10. Feedback gap
--Identify events that had registrations but received no feedback at all.
select distinct e.event_id,e.title
from Events e
join registrations r on e.event_id=r.event_id
left join feedback f on e.event_id=f.event_id
where f.event_id is null;

--11. Daily New User Count
--Find the number of users who registered each day in the last 7 days. 
select r.registration_date,count(distinct r.user_id) as users_count
from Registrations r
where r.registration_date>=curdate()-interval 7 day
group by r.registration_date
order by r.registration_date;

--12.Event with Maximum Sessions
--List the event(s) with the highest number of sessions. 
select e.event_id,e.title,count(s.session_id) as session_count
from Events e
join Sessions s on s.event_id=e.event_id
group by e.event_id,e.title
having count(s.session_id)=(
    select max(session_count)
    from(
        select count(*) as session_count
        from Sessions
        group by event_id
    )t
);

--13. Average Rating per City
--Calculate the average feedback rating of events conducted in each city. 
select e.city,avg(f.rating) as avg_rating
from Events e
join Feedback f on f.event_id=e.event_id
group by e.city;

--14.Most Registered Events
--List top 3 events based on the total number of user registrations. 
select e.title,count(r.registration_id) as registration_count
from Events e
join Registrations r on r.event_id=e.event_id
group by e.event_id,e.title
order by registration_count desc limit 3;

--15. Event Session Time Conflict
--Identify overlapping sessions within the same event (i.e., session start and end times that conflict).
select 
    s1.event_id,
    s1.session_id as session1,
    s2.session_id as session2,
    s1.start_time as s1_start,
    s1.end_time as s1_end,
    s2.start_time as s2_start,
    s2.end_time as s2_end
from Sessions s1
join Sessions s2 on s1.event_id=s2.event_id and s1.session_id<s2.session_id
where s1.start_time<s2.end_time and s1.end_time>s2.start_time;

--16. Unregistered Active Users
--Find users who created an account in the last 30 days but haven’t registered for any events.
select u.user_id,u.full_name,u.email
from Users u
left join Registrations r on u.user_id=r.user_id
where u.registration_date>=curdate()-interval 30 day and r.user_id is null;

--17. Multi-Session Speakers
--Identify speakers who are handling more than one session across all events. 
select speaker_name count(session_id) as session_count
from Sessions
group by speaker_name
having session_count>1;

--18.Resource Availability Check
--List all events that do not have any resources uploaded.
select e.title
from Events e
left join Resources r on e.event_id=r.event_id
where r.resource_id is null;

--19. Completed Events with Feedback Summary
--For completed events, show total registrations and average feedback rating. 
select e.event_id,e.title,count(distinct r.registration_id) as registration_count, avg(f.rating) as avg_rating
from Events e
left join Registrations r on r.event_id=e.event_id
left join Feedback f on f.event_id=e.event_id
where e.status='completed'
group by e.event_id,e.title;

--20. User Engagement Index
--For each user, calculate how many events they attended and how many feedbacks they submitted. 
select u.user_id,u.full_name,count(distinct r.event_id) as attended_count,count(distinct f.feedback_id) as feedback_count
from Users u
left join Registrations r on r.user_id=u.user_id
left join Feedback f on f.user_id=u.user_id
group by u.user_id,u.full_name;

--21. Top Feedback Providers
--List top 5 users who have submitted the most feedback entries. 
select u.user_id,u.full_name,count(f.feedback_id) as feedback_count
from Users u
join Feedback f on f.user_id=u.user_id
group by u.user_id,u.full_name
order by feedback_count desc
limit 5;

--22. Duplicate Registrations Check
--Detect if a user has been registered more than once for the same event.
select user_id,event_id,count(*) as registration_count
from Registrations
group by user_id, event_id
having count(*)>1;

--23. Registration Trends
--Show a month-wise registration count trend over the past 12 months. 
select year(registration_date) as  year, month(registration_date) as month, count(*) as registration_count
from Registrations
where registration_date>=curdate()-interval 12 month
group by year(registration_date),month(registration_date)
order by year,month

--24.Average Session Duration per Event
--Compute the average duration (in minutes) of sessions in each event. 
select e.event_id,e.title,avg(timestampdiff(minute,s.start_time,s.end_time)) as avg_duration_minutes
from Events e
join Sessions s on s.event_id=e.event_id
group by e.event_id,e.title;

--25. Events without Sessions
--List all events that currently have no sessions scheduled under them.
select e.event_id,e.title
from Events e
left join Sessions s on s.event_id=e.event_id
where s.session_id is null;