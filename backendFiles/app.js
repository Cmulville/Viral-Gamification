const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const app = express();

// Must match up with /etc/nginx/frameworks-available/nodejs.conf!
const port = 8081;

// Create connection to database
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '6e930c12dc934cbd849bd2be',
    database : 'deco3801'
});

db.connect((err) => {
    if (err) {
        console.log('Error Connection');
    }
    console.log('MySql Connected');
});

// Required for running behind nginx
app.set('trust proxy', 'loopback');
app.use(express.json());
app.use(cors());

const calculateDistance = (lat1, long1, lat2, long2) => {
    //birsbane is lat 1
    //uq lat 2
    let R = 6371000; // metres
    let phi1 = (lat1 * Math.PI) / 180; // φ, λ in radians
    let phi2 = (lat2 * Math.PI) / 180;
    let deltaphi = ((lat2 - lat1) * Math.PI) / 180;
    let deltalambda = ((long2 - long1) * Math.PI) / 180;
    let a =
      Math.sin(deltaphi / 2) * Math.sin(deltaphi / 2) +
      Math.cos(phi1) *
        Math.cos(phi2) *
        Math.sin(deltalambda / 2) *
        Math.sin(deltalambda / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c; // in metres
    return d;
  };

app.post('/register', (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    let userExists = false;
    let infectedChance = Math.floor(Math.random() * 2);
    let startState = infectedChance ? "Infected" : "Healthy";
    const immunity = "0";
    db.query("SELECT * FROM USERS WHERE Email = ?",
        [email, username],
        (err, result) => {
            if (result.length > 0) {
                res.send({existing: "User already exists"});
                userExists = true;
            }
        });

    if (userExists) {
        return 0;
    }
        
    db.query("INSERT INTO USERS (Username, Email, FName, LName, Password, InfectionStatus) VALUES (?,?,?,?,?,?)",
        [username, email, firstName, lastName, bcrypt.hashSync(password, 10), startState],
        (err, result) => {
            if (err) {
                res.send({complete: err});
            }
            res.send({complete: result});
        }
    );

});

app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query("SELECT * FROM USERS WHERE Email = ?",
        [email],
        (err, result) => {
            if (err) {
                res.send({err: err});
            }

            if (result.length > 0) {
                var password_hash = result[0]["Password"];
                const verified = bcrypt.compareSync(password, password_hash);

                if (verified) {
                    res.send(result);
                } else {
                    res.send({message: "Wrong password"});
                }

            } else {
                res.send({message: "Wrong email/password combination"});
            }
        }
    );
});


app.post('/findUser', (req, res) => {
    const username = req.body.username;
    db.query("SELECT Username from USERS WHERE Username = ?",
        [username],
        (err, result) => {
            if (err) {
                res.send({err: err});
            } else if (result.length == 0) {
                res.send({noUser: "Username does not exist"});
            } else {
                res.send({userExists: result});
            }
        }
    );
});

app.post('/friends/approved', (req, res) => {
    //const email = req.body.email;
    //const getUsername = "SELECT Username FROM USERS WHERE Email = ?";
    //let username = "";
    //db.query(getUsername, 
    //    [email],
    //    (err, result) => {
    //        if (err) {
    //    	res.send({err: err});
    //        } else {
    //    	username = result[0].Username;
    //        }
    //    }
    //);

    const username = req.body.username;
    const query = "SELECT Username, InfectionStatus, Longitude, Latitude FROM USERS WHERE Username IN (" +
                  "SELECT Friend1 FROM FRIENDS WHERE Friend2 = ? AND Request = 1 " +
                  "UNION DISTINCT SELECT Friend2 FROM FRIENDS WHERE Friend1 = ? AND Request = 1)";
    db.query(query,
        [username, username],
        (err, result) => {
            if (err) {
                res.send({err: err});
            } else {
                res.send({friends: result});
            }
        }
    );

});

app.post('/friends/requested', (req, res) => {
    //const email = req.body.email;
    //const getUsername = "SELECT Username FROM USERS WHERE Email = ?";
    //let username = "";
    //db.query(getUsername, 
    //    [email],
    //    (err, result) => {
    //        if (err) {
    //    	res.send({err: err});
    //        } else {y
    //    	username = result[0].Username;
    //        }
    //    }
    //);
    const username = req.body.username;
    const query = "SELECT Friend1 FROM FRIENDS WHERE Friend2 = ? AND Request = 0 "; 
    db.query(query,
        [username],
        (err, result) => {
            if (err) {
                res.send({err: err});
            } else {
                res.send({friends: result});
            }
        }
    );

});

app.post('/friends/makeRequest', (req, res) => {
    const requestor = req.body.requestor;
    const requestee = req.body.requestee;
    const approved = 0;
    db.query("INSERT INTO FRIENDS (Friend1, Friend2, Request) VALUES (?, ?, ?)",
        [requestor, requestee, approved],
        (err, result) => {
            if (err) {
                res.send({err: err});
            } else {
                res.send({success: "success"});
            }
        }
    );

});

app.post('/friends/approve', (req, res) => {
    const requestor = req.body.requestor;
    const requestee = req.body.requestee;
    db.query("UPDATE FRIENDS SET Request = 1 WHERE Friend1 = ? AND Friend2 = ?",
        [requestor, requestee],
        (err, result) => {
            if (err) {
                res.send({err: err});
            }
            res.send({success: "success"});
        }
    );
});

app.post('/friends/deny', (req, res) => {
    const requestor = req.body.requestor;
    const requestee = req.body.requestee;
    db.query("DELETE FROM FRIENDS WHERE Friend1 = ? AND Friend2 = ?",
        [requestor, requestee],
        (err, result) => {
            if (err) {
                res.send({err: err});
            }
            res.send({success: "success"});
        }
    );
});

app.post('/friends/delete', (req, res) => {
    const requestor = req.body.requestor;
    const requestee = req.body.requestee;
    db.query("DELETE FROM FRIENDS WHERE (Friend1 = ? AND Friend2 = ?)" +
             "OR (Friend1 = ? AND Friend2 = ?)",
        [requestor, requestee, requestee, requestor],
        (err, result) => {
            if (err) {
                res.send({err: err});
            }
            res.send({success: "success"});
        }
    );
});

app.post('/location/update', (req, res) => {
    const longitude = req.body.longitude;
    const latitude = req.body.latitude;
    const user = req.body.user;

    db.query("UPDATE USERS SET Longitude = ?, Latitude = ? WHERE Username = ?",
	[longitude, latitude, user],
	(err, result) => {
            if (err) {
                res.send({err: err});
            }
        });

});

app.post('/location/checkInfected', (req, res) => {
    const longitude = req.body.longitude;
    const latitude = req.body.latitude;
    const user = req.body.user;
    var infectedStatus = false;

    db.query("SELECT Longitude, Latitude FROM USERS WHERE InfectionStatus = 'Infected'",
	(err, result) => {
	    if (err) {
		res.send({err: err});
	    } else {
		var infectedStatus = false;
		for (var i = 0; i < result.length; i++) {
		    if (calculateDistance(latitude, longitude, result[i].Latitude, result[i].Longitude) < 18) {
			if (Math.random() <= 0.33) {
				infectedStatus = true;
			}
		    }
		}
		res.send({infected: infectedStatus});
	    }
    	}
    );	

});

app.post('/location/get', (req, res) => {
    const email = req.body.email;
    db.query("SELECT Longitude, Latitude FROM USERS WHERE Email = ?",
        [email],
        (err, result) => {
            if (err) {
                res.send({err: err});
            }
            if (result.length > 0) {
                res.send({loc:result});
            }
        }
    );

});

app.post('/items/get', (req, res) => {
    db.query("SELECT ID, ItemType, Longitude, Latitude FROM ITEMS",
        (err, result) => {
            if (err) {
                res.send({err: err});
            }
            if (result.length > 0) {
                res.send({loc:result});
            }
        }
    );

});

app.post('/items/count', (req, res) => {
    db.query("SELECT COUNT(*) AS count FROM ITEMS",
        (err, result) => {
            if (err) {
                res.send({err: err});
            }
            if (result.length > 0) {
                res.send({count:result});
            }
        }
    );
});

app.post('/items/add', (req, res) => {
    const itemtype = req.body.itemtype;
    const longitude = req.body.longitude;
    const latitude  = req.body.latitude;
    db.query("INSERT INTO ITEMS (Longitude, Latitude, ItemType) VALUES (?, ?, ?))",
	[longitude, latitude, itemtype],
        (err, result) => {
            if (err) {
                res.send({err: err});
            }
	    res.send({success: "success"});
        });


});

app.post('/user/item', (req, res) => {
    const username = req.body.username;
    const itemid = req.body.itemid;
    db.query("SELECT * FROM COLLECTEDITEMS WHERE Username = ? AND ItemID = ?",
	[username, itemid],
	(err, result) => {
		if (err) {
			res.send({err:err});
		}
		res.send({result:result});
	});

});

app.post('/user/getItems', (req, res) => {
    const username = req.body.username;
    db.query("SELECT * FROM COLLECTEDITEMS WHERE Username = ?",
	[username],
	(err, result) => {
		if (err) {
			res.send({err:err});
		}
		res.send({result:result});
	});
});

app.post('/user/addNewItem', (req, res) => {
    const username = req.body.username;
    const itemid = req.body.itemid;
    db.query("INSERT INTO COLLECTEDITEMS (Username, ItemID, Amount) VALUES (?, ?, 1)",
          [username, itemid],
          (err, result) => {
              if (err) {
                  res.send({err: err});
              }
              res.send({incremented: "Added 1 item"});
      });

});

app.post('/user/updateItemCount', (req, res) => {
    const username = req.body.username;
    const itemid = req.body.itemid;
    db.query("UPDATE COLLECTEDITEMS SET Amount = Amount + 1 WHERE Username = ? AND ItemID = ?",
           [username, itemid],
           (err, result) => {
               if (err) {
                   res.send({err: err});
               }
               res.send({incremented: "Incremented by 1"});
    });

});
 
app.post('/users/distance', (req, res) => {
    const username = req.body.username;
    const query = "SELECT Username, InfectionStatus, Longitude, Latitude FROM USERS WHERE NOT UserName = ?";
    db.query(query,
        [username],
	(err, result) => {
	    if (err) {
                res.send({err: err});
            } else {
                res.send({users: result});
            }
        });
});

app.post('/users/infect', (req, res) => {
    const username = req.body.username;
    const query = "UPDATE USERS SET InfectionStatus = 'Infected' WHERE Username = ?";
    db.query(query,
        [username],
        (err, result) => {
            if (err) {
                res.send({err: err});
            }
            res.send({success: "success"});
        });

});

  
app.post('/user/itemCount', (req, res) => {
    const username = req.body.username;
    db.query("SELECT * FROM COLLECTEDITEMS WHERE Username = ?",
	[username],
	(err, result) => {
            if (err) {
                res.send({err: err});
            }
	    res.send({result: result});
        });

});


app.post('/userStats', (req, res) => {
    const email = req.body.email
    db.query("SELECT Username, Email, InfectionStatus, Points, dailyLogin, ImmunityCountdown, FirstTime FROM USERS WHERE Email = ?",
	[email],
	(err, result) => {
            if (err) {
                res.send({err: err});
            }
	    res.send({stat: result});
        });

});

app.post('/userFirst', (req, res) => {
    const username = req.body.username;
    db.query("SELECT FirstTime FROM USERS WHERE Username = ?",
	[username],
	(err, result) => {
            if (err) {
                res.send({err: err});
            }
	    res.send({firstTime: result});
        });

});

app.post('/updateUserFirst', (req, res) => {
    const username = req.body.username;
    db.query("UPDATE USERS SET FirstTime = 1 WHERE Username = ?",
	[username],
	(err, result) => {
            if (err) {
                res.send({err: err});
            }
	    res.send({success: "success"});
        });

});

app.post('/user/updatePoints', (req, res) => {
    const points = req.body.points    
    const email = req.body.email
    db.query("UPDATE USERS SET Points = ? WHERE Email = ?",
	[points, email],
	(err, result) => {
            if (err) {
                res.send({err: err});
            }
        });

});

app.post('/user/updateStatus', (req, res) => {
    const infectionStatus = req.body.infectionStatus    
    const email = req.body.email
    db.query("UPDATE USERS SET InfectionStatus = ? WHERE Email = ?",
	[infectionStatus, email],
	(err, result) => {
            if (err) {
                res.send({err: err});
            }
        });

});

app.post('/user/updateDaily', (req, res) => {
    const email = req.body.email
        db.query("UPDATE USERS SET dailyLogin = 0 WHERE Email = ?",
	[email],
	(err, result) => {
            if (err) {
		res.send({err: err});
            }
        });

});

app.post('/user/setImmunityTimer', (req, res) => {
    const time = req.body.time;
    const email = req.body.email;

    db.query("UPDATE USERS SET Time = ? WHERE Email = ?",
	[time, email],
	(err, result) => {
            if (err) {
                res.send({err: err});
            }
        });

});


app.post('/user/cure_user', (req, res) => {
    const username = req.body.username;

    db.query("UPDATE COLLECTEDITEMS SET Amount = Amount - 5 WHERE Username = ? AND Amount >= 5",
	[username],
	(err, result) => {
            if (err) {
                res.send({err: err});
            }
	res.send({success: "success"});
        });

 });

app.post('/reset_game_stats', (req, res) => {
  
    db.query("UPDATE USERS SET InfectionStatus = 'Infected'",
	
	(err, result) => {
            if (err) {
                res.send({err: err});
            }
	res.send({success: "success"});
        });
    
    db.query("UPDATE COLLECTEDITEMS SET Amount = 0",
	
	(err, result) => {
            if (err) {
                res.send({err: err});
            }
	res.send({success: "success"});
        });

 });

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
