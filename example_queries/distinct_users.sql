/*
 * Not completely accurate, since we don't have any authentication mechanism and just store the ID in users localStorage.
 * For example, if users use the site on multiple different devices, they will be counted as multiple distinct users.
 */
select count(distinct user_id) as distinct_users from guesses;