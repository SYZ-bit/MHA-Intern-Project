sql_statement = "SELECT * FROM users WHERE username='%s' and password='%s'" % (username, password)
c.execute(sql_statement)