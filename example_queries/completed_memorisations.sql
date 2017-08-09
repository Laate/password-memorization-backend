select user_id, count(*) as completed_memorisations
from guesses
where user_input=full_text
group by user_id;