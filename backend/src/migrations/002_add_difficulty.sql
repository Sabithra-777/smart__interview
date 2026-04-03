ALTER TABLE questions
ADD COLUMN IF NOT EXISTS difficulty TEXT DEFAULT 'Medium';

UPDATE questions SET difficulty='Medium' WHERE difficulty IS NULL;