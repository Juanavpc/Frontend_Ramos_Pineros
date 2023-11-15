import { Box, Typography, useTheme, Button, Dialog, DialogTitle, IconButton, TextField, Select, MenuItem } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Header from "../../components/Header";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);

  const handleEditUserClick = () => {
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleEditUser = () => {
    // Realiza la lógica de edición del producto aquí
    console.log("User edited:");
    handleCloseEditModal();
  };

  const handleDeleteUserClick = () => {
    setOpenDeleteConfirmation(true);
  };

  const handleCloseDeleteConfirmation = () => {
    setOpenDeleteConfirmation(false);
  };

  const handleDeleteUser = () => {
    // Realiza la lógica de eliminación del producto aquí
    console.log("User deleted:");
    handleCloseDeleteConfirmation();
  };

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="60%"
          >
            {access === "Cortador"}
            {access === "Guarnecedor "}
            {access === "Ensamblador"}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {access}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: () => {
        return (
          <Box
            width="100%"
            height="75%"
            display="flex"
            justifyContent="space-evenly"
            borderRadius="4px"
          >
            <Box
              width="30%"
              p="5px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              backgroundColor={colors.greenAccent[600]}
              borderRadius="4px"
              onClick={handleDeleteUserClick}
              style={{ cursor: "pointer" }}
            >
              <DeleteOutlineIcon />
            </Box>
            <Box
              width="30%"
              p="5px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              backgroundColor={colors.greenAccent[600]}
              borderRadius="4px"
              onClick={handleEditUserClick}
              style={{ cursor: "pointer" }}
            >
              <EditIcon />
            </Box>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="USERS / EMPLOYEES" subtitle="Managing the Team Members" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={mockDataTeam} columns={columns} />
      </Box>

        {/* Modal para editar usuario */}
        <Dialog open={openEditModal} onClose={handleCloseEditModal}>
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography sx={{mt:1, mb:1}} variant="h2" fontWeight="bold">Edit User</Typography>
            <IconButton onClick={handleCloseEditModal}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <Box p={3}>
          {/* Formulario para editar un usuario */}
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <Select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            label="Role"
            fullWidth
            displayEmpty
            margin="normal"
            variant="outlined"
            required
            sx={{ marginBottom: "8px" }}
          >
            <MenuItem value="" disabled>
              Role
            </MenuItem>
            <MenuItem value="role1">Cortador</MenuItem>
            <MenuItem value="role2">Ensamblador</MenuItem>
            <MenuItem value="role3">Guarnecedor</MenuItem>
          </Select>
          <Box display="flex" justifyContent="center" mt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleEditUser}
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      </Dialog>

      {/* Modal de confirmación de eliminación */}
      <Dialog open={openDeleteConfirmation} onClose={handleCloseDeleteConfirmation}>
      <DialogTitle>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography fontWeight="bold" variant="h4">Confirm Deletion</Typography>
          <IconButton onClick={handleCloseDeleteConfirmation}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <Box p={3}>
        <Typography>
          Are you sure you want to delete the selected user?
        </Typography>
        <Box display="flex" justifyContent="center" marginTop="15px">
          <Button
            variant="contained"
            color="primary"
            onClick={handleDeleteUser}
          >
            Confirm Delete
          </Button>
        </Box>
      </Box>
      </Dialog>
    </Box>
  );
};

export default Team;
