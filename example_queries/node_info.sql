select node_id, left_ok, right_ok, count(*), char_length(full_text) as text_length
from guesses
group by node_id, left_ok, right_ok, char_length(full_text)
order by text_length, node_id;
