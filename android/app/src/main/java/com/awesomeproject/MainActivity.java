package com.awesomeproject;


import android.content.Intent;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;
import java.util.concurrent.ArrayBlockingQueue;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "AwesomeProject";
    }

//    /**
//     * 打开 带返回的Activity
//     * @param requestCode
//     * @param resultCode
//     * @param data
//     */
//    @Override
//    public void onActivityResult(int requestCode, int resultCode, Intent data) {
//        super.onActivityResult(requestCode, resultCode, data);
//        if (resultCode == RESULT_OK && requestCode == 200) {
//            String result = data.getStringExtra("three_result");
//            if (result != null && !result.equals("")) {
//                mQueue.add(result);
//            } else {
//                mQueue.add("无数据啦");
//            }
//        } else {
//            mQueue.add("没有回调...");
//        }
//    }
}
