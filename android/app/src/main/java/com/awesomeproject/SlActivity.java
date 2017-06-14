package com.awesomeproject;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.view.View.OnClickListener;

/**
 * Created by Youngbye on 2017/5/31.
 */

public class SlActivity extends Activity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.first_layout);

        //view层的控件和业务层的控件，靠id关联和映射  给btn1赋值，即设置布局文件中的Button按钮id进行关联
        Button btn1 = (Button) findViewById(R.id.button_1);

        //给btn1绑定监听事件
        btn1.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
            // 给bnt1添加点击响应事件
            Intent intent = new Intent(SlActivity.this, MainActivity.class);
            intent.putExtra("data","传入JS中的数据...123");
            //启动
            startActivity(intent);
            }
        });
    }
}
//
//package com.awesomeproject;
//
//import android.app.Activity;
//import android.content.Intent;
//
//import com.facebook.react.bridge.JSApplicationIllegalArgumentException;
//import com.facebook.react.bridge.ReactApplicationContext;
//import com.facebook.react.bridge.ReactContextBaseJavaModule;
//import com.facebook.react.bridge.ReactMethod;
//
//public class SlActivity extends ReactContextBaseJavaModule {
//
//    public SlActivity(ReactApplicationContext reactContext) {
//        super(reactContext);
//    }
//
//    @Override
//    public String getName() {
//        return "IntentModule";
//    }
//
//    /**
//     * 从JS页面跳转到原生activity 同时也可以从JS传递相关数据到原生
//     * @param name 需要打开的Activity的class
//     * @param params
//     */
//    @ReactMethod
//    public void startActivityFromJS(String name, String params){
//        try{
//            Activity currentActivity = getCurrentActivity();
//            if(null!=currentActivity){
//                Class toActivity = Class.forName(name);
//                Intent intent = new Intent(currentActivity, MyReactActivity.class);
//                intent.putExtra("params", params);
//                currentActivity.startActivity(intent);
//            }
//        }catch(Exception e){
//            throw new JSApplicationIllegalArgumentException(
//                    "不能打开Activity : "+e.getMessage());
//        }
//    }
//}
