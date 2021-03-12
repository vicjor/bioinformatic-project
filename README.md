### Installation

`python3 -m venv venv && pip install -r requirements.txt && . venv/bin/activate`

If necessary:
`python manage.py migrate`

Load data into database from training set:
`python manage.py load_training_set --input_path data/train_set.fasta`
