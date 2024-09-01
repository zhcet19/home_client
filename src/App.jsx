import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  MenuItem,
  FormControl,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  Grid,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";

// users list
const users = [
  "user1",
  "user2",
  "user3",
  "user4",
  "user5",
  "user6",
  "user7",
  "user8",
  "user9",
  "user10",
];

const App = () => {
  const [selectedUser, setSelectedUser] = useState("user1");
  const [showModal, setShowModal] = useState(false);

  // homes list
  const [homes, setHomes] = useState([
    // Example data, you can fetch real data from an API
    {
      id: 1,
      address: "72342 Jacobson Square",
      price: "$872094",
      state: "Arizona",
      zip: "26958",
      sqft: "1513.86",
      beds: 3,
      baths: 1,
      users: ["user1", "user3", "user5"],
    },
    {
      id: 2,
      address: "75246 Cumberland Street",
      price: "$218894",
      state: "Kansas",
      zip: "12773",
      sqft: "2198.29",
      beds: 2,
      baths: 1,
      users: ["user1", "user4"],
    },
    {
      id: 3,
      address: "911 Walker-Bogan Terrace",
      price: "$310939",
      state: "Rhode Island",
      zip: "49176",
      sqft: "1502.05",
      beds: 4,
      baths: 3,
      users: ["user1", "user6", "user7"],
    },
    {
      id: 4,
      address: "5783 Mallie Gateway",
      price: "$813788",
      state: "Nebraska",
      zip: "17967",
      sqft: "2309.85",
      beds: 2,
      baths: 2,
      users: ["user1", "user8"],
    },
    {
      id: 5,
      address: "911 Walker-Bogan Terrace",
      price: "$310939",
      state: "Rhode Island",
      zip: "49176",
      sqft: "1502.05",
      beds: 4,
      baths: 3,
      users: ["user1", "user6", "user7"],
    },
    {
      id: 6,
      address: "5783 Mallie Gateway",
      price: "$813788",
      state: "Nebraska",
      zip: "17967",
      sqft: "2309.85",
      beds: 2,
      baths: 2,
      users: ["user1", "user8"],
    },
    // Add more homes as needed
  ]);
  const [selectedHome, setSelectedHome] = useState(null);

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleEditUsers = (home) => {
    setSelectedHome(home);
    setShowModal(true);
  };

  const handleSave = () => {
    setShowModal(false);
  };

  return (
    <Box p={3}>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          right: 2,
          left: 0,
          p: 2,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Typography variant="h6" sx={{ m: 2 }}>
          Select User:{" "}
        </Typography>
        <FormControl variant="outlined">
          <Select
            value={selectedUser}
            onChange={handleUserChange}
            sx={{ width: "400" }}
          >
            {users.map((user) => (
              <MenuItem key={user} value={user}>
                {user}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, marginTop: 15 }}>
        {homes
          .filter((home) => home.users.includes(selectedUser))
          .map((home) => (
            <Grid item xs={12} sm={6} md={2.3} lg={2.3} key={home.id}>
              <Card sx={{ width: 300, height: 300 }}>
                <CardContent>
                  <Typography variant="h5">{home.address}</Typography>

                  <Typography mt={1} variant="body1">
                    Price: {home.price}
                  </Typography>
                  <Typography variant="body1">State: {home.state}</Typography>
                  <Typography variant="body1">Zip: {home.zip}</Typography>
                  <Typography variant="body1">Sqft: {home.sqft}</Typography>
                  <Typography variant="body1">Beds: {home.beds}</Typography>
                  <Typography variant="body1">Baths: {home.baths}</Typography>
                </CardContent>
                <CardActions
                  sx={{
                    bottom: 0,
                    left: 0,
                    right: 0,
                    justifyContent: "bottom",
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() => handleEditUsers(home)}
                  >
                    Edit Users
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Box>

      {selectedHome && (
        <Dialog open={showModal} onClose={() => setShowModal(false)}>
          <DialogTitle>Modify Users for: {selectedHome.address}</DialogTitle>
          <DialogContent>
            {users.map((user) => (
              <Box key={user} sx={{ display: "block", width: "100%" }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedHome.users.includes(user)}
                      onChange={(e) => {
                        const updatedUsers = e.target.checked
                          ? [...selectedHome.users, user]
                          : selectedHome.users.filter((u) => u !== user);
                        setSelectedHome({
                          ...selectedHome,
                          users: updatedUsers,
                        });
                      }}
                    />
                  }
                  label={user}
                />
              </Box>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowModal(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default App;
