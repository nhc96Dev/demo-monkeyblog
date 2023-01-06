import { Button } from "components/button";
import { useAuth } from "contexts/auth-context";
import { db } from "firebase-app/firebase-config";
import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { debounce } from "lodash";
import DashboardHeading from "module/dashboard/DashboardHeading";
import React, { useEffect, useState } from "react";
import { userRole } from "utils/constants";
import UserTable from "./UserTable";

const USER_PER_PAGE = 5;
const UserManage = () => {
  const { userInfo } = useAuth();
  // if (userInfo.role !== userRole.ADMIN) return null;

  const [userList, setUserList] = useState([]);
  const [lastDoc, setLastDoc] = useState();
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState(undefined);

  const handleLoadMoreUser = async () => {
    const nextRef = query(
      collection(db, "users"),
      startAfter(lastDoc || 0),
      limit(USER_PER_PAGE)
    );

    onSnapshot(nextRef, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setUserList([...userList, ...results]);
    });
    const documentSnapshots = await getDocs(nextRef);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastDoc(lastVisible);
  };

  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "users");
      const newRef = filter
        ? query(
            colRef,
            where("username", ">=", filter),
            where("username", "<=", filter + "utf8")
          )
        : query(colRef, limit(USER_PER_PAGE));
      const documentSnapshots = await getDocs(newRef);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];

      onSnapshot(colRef, (snapshot) => {
        setTotal(snapshot.size);
      });

      onSnapshot(newRef, (snapshot) => {
        let results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setUserList(results);
      });
      setLastDoc(lastVisible);
    }
    fetchData();
  }, [filter]);

  const handleInputFilter = debounce((e) => {
    setFilter(e.target.value);
  }, 500);

  return (
    <div>
      <DashboardHeading title="Users" desc="Manage your user">
        {userInfo.role === userRole.ADMIN && (
          <Button kind="ghost" to="/manage/add-user">
            Add User
          </Button>
        )}
      </DashboardHeading>
      <div className="flex justify-start mb-10">
        <input
          type="text"
          placeholder="Enter username..."
          className="px-4 py-[14px] border border-gray-300 rounded-lg outline-none"
          onChange={handleInputFilter}
        />
      </div>

      <UserTable userList={userList}></UserTable>

      {total > userList.length && (
        <div className="mt-10 text-gray-500 text-sm">
          <Button onClick={handleLoadMoreUser} className="mx-auto">
            Load more
          </Button>
          <span className="block mt-5">{`Users: ${total}`}</span>
        </div>
      )}
    </div>
  );
};

export default UserManage;
