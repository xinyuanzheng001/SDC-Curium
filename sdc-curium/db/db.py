from multiprocessing.dummy import Process
import psycopg2;
import csv;
import time;

conn = psycopg2.connect(
  database='sdc_curium',
  user='postgres'
)

cursor = conn.cursor()
now = time.time()
def read_product():
  with open('product.csv', newline='') as csvfile:
    data = csv.reader(csvfile)
    count = 0
    row1 = next(data)
    for row in data:
      query = '''INSERT INTO product (product_name, slogan, product_description, category, default_price) VALUES ('{}', '{}','{}','{}','{}');'''.format(str(row[1].replace("'", '"')), str(row[2].replace("'", '"')), str(row[3].replace("'", '"')), str(row[4].replace("'", '"')), str(row[5].replace("'", '"')))
      cursor.execute(query)
      count+=1
      print('p: {}'.format(count))
def read_related():
  with open('related.csv', newline='') as csvfile:
    data = csv.reader(csvfile)
    count = 0
    row1 = next(data)
    for row in data:
      query = '''INSERT INTO related_products (product_id, related_product_id) VALUES ({}, {});'''.format(int(row[1]), int(row[2]))
      cursor.execute(query)
      count += 1
      print('r: {}'.format(count))
def read_features():
  with open('features.csv', newline='') as csvfile:
    data = csv.reader(csvfile)
    count = 0
    row1 = next(data)
    for row in data:
      query = '''INSERT INTO features (feature, feature_value, product_id) VALUES ('{}', '{}', {});''' .format(str(row[2]), str(row[3]), int(row[1]))
      cursor.execute(query)
      count += 1
      print('f: {}'.format(count))
def read_styles():
  with open('styles.csv', newline='') as csvfile:
    data = csv.reader(csvfile)
    count = 0
    row1 = next(data)
    for row in data:
      query = '''INSERT INTO styles (style_name, sale_price, original_price, default_style, product_id) VALUES ('{}', '{}', '{}', {}, {});'''.format(str(row[2]), str(row[3]), str(row[4]), row[5], row[1])
      cursor.execute(query)
      count += 1
      print('s: {}'.format(count))

def read_skus():
  with open('skus.csv', newline='') as csvfile:
    data = csv.reader(csvfile)
    row1 = next(data)
    for row in data:
      if(int(row[1]) <= 1558398):
        query = '''INSERT INTO skus (size, quantity, styles_id) VALUES ('{}', {}, {});'''.format(str(row[2]), row[3], row[1])
        cursor.execute(query)
        print('sk: {}'.format(row[0]))

def read_photos():
  with open('photos.csv', newline='') as csvfile:
    data = csv.reader(csvfile)
    count = 0
    row1 = next(data)
    for row in data:
      if(int(row[1]) <= 1558398):
        query = '''INSERT INTO photos (thumbnail_url, image_url, styles_id) VALUES ('{}', '{}', {});'''.format(str(row[3]), str(row[2]), row[1])
        cursor.execute(query)
        count += 1
        print('p: {}'.format(count))
# if __name__ == '__main__':
#   read_product()
#   conn.commit()
#   p2 = Process(target = read_related)
#   p3 = Process(target = read_features)
#   p4 = Process(target = read_styles)
#   p2.start()
#   p3.start()
#   p4.start()
#   p2.join()
#   p3.join()
#   p4.join()
#   conn.commit()
#   p5 = Process(target = read_skus)
#   p6 = Process(target = read_photos)
#   p5.start()
#   p6.start()
#   p5.join()
#   p6.join()
#   conn.commit()

# read_skus()
read_photos()
conn.commit()
print('time: {}'.format(time.time() - now))


cursor.execute('select * from product;')
data = cursor.fetchone()

print(data)

conn.close()