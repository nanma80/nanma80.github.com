import json

input_file_name = 'adjacencyMatrices.py'
# input_file_name = 'test.py'
output_file_name = 'ranks.js'

def get_raw_matrices(filename):
  with open(filename, 'r') as file:
    raw_matrices = json.loads(file.read())
  return raw_matrices

def matrix_gf2_rank(matrix):
  n_rows = len(matrix)
  n_columns = len(matrix[0])
  MS = MatrixSpace(GF(2), n_rows, n_columns)
  matrix_gf2 = MS(matrix)
  return matrix_gf2.rank()

count = 0
ranks = {}
raw_matrices = get_raw_matrices(input_file_name)
for puzzle, raw_matrix in raw_matrices.iteritems():
  ranks[puzzle] = matrix_gf2_rank(raw_matrix)
  count += 1

with open(output_file_name, 'w') as file:
  file.write("var ranks = " + json.dumps(ranks))

print "Written the ranks of " + repr(count) + " puzzles to " + output_file_name
