sql_statement = "SELECT username FROM users WHERE username='%s' and password='%s'" % (username, password_hash)
c.execute(sql_statement)