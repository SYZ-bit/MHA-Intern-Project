sql_statement = "SELECT * FROM users WHERE username = %s AND password = %s",(username, password)
c.execute(sql_statement)